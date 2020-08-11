from datetime import datetime
from decimal import Decimal
import os
from hashlib import sha256

import botocore.exceptions
import boto3

from chalicelib.models.order import Order
from chalicelib.models.order_item import OrderItem

table = boto3.resource('dynamodb').Table(os.environ['APP_TABLE_NAME'])


def perform_standard_operation(params):
    """
    Performs standard operations (create, read, update, query, scan)
    on DynamoDB table based on the parameter payload that was passed
    :param params: the parameters to pass for DynamoDB operation
    :return: DynamoDB operation output
    """
    operation = params['operation']
    standard_operations = {
        'create': lambda x: table.put_item(**x),
        'read': lambda x: table.get_item(**x),
        'update': lambda x: table.update_item(**x),
        'query': lambda x: table.query(**x),
        'scan': lambda x: table.scan(**x)
    }

    # Perform the operation that was sent in the params payload.
    if operation in standard_operations:
        try:
            return standard_operations[operation](params.get('payload'))
        except botocore.exceptions.ClientError as e:
            return 'Client error: {}'.format(e)
        except botocore.exceptions.ParamValidationError as e:
            raise ValueError('Parameters invalid: {}'.format(e))

    else:
        raise ValueError('Unrecognized operation "{}"'.format(operation))


def perform_batch_put(params):
    """
    Performs a batch put on DynamoDB table based on the parameter
    payload that was passed.
    :param params: the parameters to pass for DynamoDB batch put
    :return: None
    """
    print(params['payload']['order_items'])
    with table.batch_writer() as batch:
        for order_item in params['payload']['order_items']:
            batch.put_item(order_item)


def parse_order_items(sk, item_dict):
    """
    Parses the body from HTTP request to checkout items
    :param sk: the order id that represents which order this item is part of
    :param item_dict: list of dictionary objects containing order item information
    :return: order_items: list of OrderItem objects
    """
    order_items = []
    for key, value in item_dict.items():
        product_name = key
        quantity = value['quantity']
        total_item_price = value['total_item_price']
        pk = 'ITEM#' + str(sha256(datetime.now().isoformat().encode()).hexdigest())
        order_item = OrderItem(item_id=pk, order_id=sk, product_name=product_name, quantity=quantity, total_item_price=total_item_price)
        order_items.append(order_item.get_order_item_info())
    return order_items


def calculate_total_item_price(product_name, quantity, category):
    """
    Calculate the total price of an item based on its quantity. The exact price of the
    item is retrieved from DynamoDB.
    :param category: the categoryof the item
    :param product_name: the name of the item
    :param quantity: the integer value describing the quantity of the item
    :return: total_item_price: the total price of the item
    """
    params = {
        'operation': 'query',
        'payload': {
            'IndexName': 'GSI-1',
            'FilterExpression': 'begins_with(product_name, :pn)',
            'KeyConditionExpression': 'SK = :sk AND begins_with(PK, :pk)',
            'ExpressionAttributeValues': {
                ':sk': category,
                ':pk': 'PROD#',
                ':pn': product_name},
            'ProjectionExpression': 'price'}}
    response = perform_standard_operation(params)
    item_price = response['Items'][0]['price']
    total_item_price = Decimal(item_price) * int(quantity)
    return total_item_price


def calculate_total_cart_price(order_items):
    """
    Calculate the total price of the shopping cart.
    :param order_items: list of OrderItem objects
    :return: total_cart_price: the total price of the shopping cart
    """
    total_cart_price = Decimal(0.0)
    for item in order_items:
        total_cart_price += item['total_item_price']
    return total_cart_price


def get_shopping_cart(user_id):
    # Build params for DynamoDB operation
    params = {
        'operation': 'read',
        'payload': {
            'Key': {
                'PK': user_id,
                'SK': user_id},
            'ProjectionExpression': 'shopping_cart'}}

    # Call DynamoDB
    response = perform_standard_operation(params)

    shopping_cart = response['Item']['shopping_cart']
    return shopping_cart


def update_shopping_cart(user_id, cart_item):
    item_price = calculate_total_item_price(cart_item['product_name'], cart_item['quantity'], cart_item['category'])
    # Build params for DynamoDB operation
    params = {
        'operation': 'update',
        'payload': {
            'Key': {'PK': user_id, 'SK': user_id},
            'UpdateExpression': 'SET #cart.#prod_name=:s',
            'ExpressionAttributeValues': {
                ':s':  {
                    'product_name': cart_item['product_name'],
                    'quantity': cart_item['quantity'],
                    'total_item_price': item_price,
                    'img_url': cart_item['img_url']}},
            'ExpressionAttributeNames': {
                '#cart': 'shopping_cart',
                '#prod_name': cart_item['product_name']
            },
            'ReturnValues': 'UPDATED_NEW'}}
    # Call DynamoDB
    response = perform_standard_operation(params)
    print(response)
    shopping_cart = response['Attributes']['shopping_cart']
    return shopping_cart


def remove_from_shopping_cart(user_id, cart_item):
    params = {
        'operation': 'update',
        'payload': {
            'Key': {'PK': user_id, 'SK': user_id},
            'UpdateExpression': 'remove #cart.#prod_name',
            'ExpressionAttributeNames': {
                '#cart': 'shopping_cart',
                '#prod_name': cart_item['product_name']},
            'ReturnValues': 'UPDATED_NEW'}}
    response = perform_standard_operation(params)
    status_code = response['ResponseMetadata']['HTTPStatusCode']
    return status_code


def clear_shopping_cart(user_id):
    params = {
        'operation': 'update',
        'payload': {
            'Key': {'PK': user_id, 'SK': user_id},
            'UpdateExpression': 'set #cart=:s',
            'ExpressionAttributeValues': {':s': {}},
            'ExpressionAttributeNames': {'#cart': 'shopping_cart'},
            'ReturnValues': 'UPDATED_NEW'
        }
    }
    response = perform_standard_operation(params)
    shopping_cart = response['Attributes']['shopping_cart']
    return shopping_cart


def get_products():
    # Create DynamoDB request params
    params = {
        'operation': 'scan',
        'payload': {
            'ProjectionExpression': 'SK, img_url, price, product_name',
            'FilterExpression': 'begins_with(PK, :pk)',
            'ExpressionAttributeValues': {
                ':pk': 'PROD#'}}}
    response = perform_standard_operation(params)

    products = response['Items']
    return products


def get_order_history(user_id):
    order_history = []
    order_params = {
        'operation': 'query',
        'payload': {
            'KeyConditionExpression': 'PK = :pk AND begins_with(SK, :sk)',
            'ExpressionAttributeValues': {
                ':pk': user_id,
                ':sk': 'ORDER#'},
            'ProjectionExpression': 'SK, order_status, order_date, address, total_cart_price'}}

    # Call DynamoDB
    order_response = perform_standard_operation(order_params)
    print(order_response)
    items = order_response['Items']
    for item in items:
        order_id = item['SK']
        # Create DynamoDB request params
        order_items_params = {
            'operation': 'query',
            'payload': {
                'IndexName': 'GSI-1',
                'KeyConditionExpression': 'SK= :sk AND PK BETWEEN :items AND :user',
                'ExpressionAttributeValues': {
                    ':sk': order_id,
                    ':user': 'USER#',
                    ':items': 'ITEM#'},
                'ProjectionExpression': 'quantity, product_name, total_item_price'}}

        # Call DynamoDB
        order_items_response = perform_standard_operation(order_items_params)
        print(order_items_response)
        order_info = item
        order_info['order_items'] = order_items_response['Items']
        # Add each order to list of orders
        order_history.append(order_info)

    print('{} order history retrieved'.format(user_id))
    return order_history


def checkout(order_pk, address):
    d = datetime.utcnow().isoformat()
    shopping_cart = get_shopping_cart(order_pk)

    # Create Order and Order Items
    order_items = create_order_items(d, shopping_cart)
    order = create_order(d, order_items, order_pk, address)

    # Create DynamoDB request params
    order_params = {
        'operation': 'create',
        'payload': {
            'Item': order.get_order_info()}}
    order_items_params = {
        'operation': 'batch_put',
        'payload': {
            'order_items': order_items}}

    # Call DynamoDB
    perform_standard_operation(order_params)
    perform_batch_put(order_items_params)

    print('Checkout successful. Order no: {}.'.format('ORDER#' + str(sha256(d.encode()).hexdigest())))
    return clear_shopping_cart(order_pk)


def create_order(date, order_items, order_pk, address):
    order_sk = 'ORDER#' + str(sha256(date.encode()).hexdigest())
    order_date = datetime.now().isoformat()
    order_status = 'PLACED'
    total_cart_price = calculate_total_cart_price(order_items)
    order = Order(user_id=order_pk, order_id=order_sk, order_status=order_status, order_date=order_date, address=address, total_cart_price=total_cart_price)
    return order


def create_order_items(date, cart):
    order_item_sk = 'ORDER#' + str(sha256(date.encode()).hexdigest())
    order_items = parse_order_items(order_item_sk, cart)
    return order_items


def get_category_filter(category):
    params = {
        'operation': 'query',
        'payload': {
            'IndexName': 'GSI-1',
            'KeyConditionExpression': 'SK = :sk AND begins_with(PK, :pk)',
            'ExpressionAttributeValues': {
                ':sk': category,
                ':pk': 'PROD#'},
            'ProjectionExpression': 'img_url, price, product_name, SK'}}
    response = perform_standard_operation(params)
    products = response['Items']
    return products
