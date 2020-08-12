+++
title = "Develop Shopping Cart Utility Functions"
menuTitle = "Shopping Cart Utility"
weight = 25
pre = "<b>4.4 </b>"
+++

During this module, you will develop the various utility functions for the `/shopping_cart` endpoint.

## util.py
At the top of your `util.py` file, add the following imports:
```python
from datetime import datetime
from decimal import Decimal
from hashlib import sha256
```

You will also need to add quite a few functions to the file to develop proper shopping cart functionality.

### get_shopping_cart()
This function builds the necessary DynamoDB request parameters to get the current user's shopping cart.
```python
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
```

### calculate_total_item_price()
This function calculates the total price of an item based on its quantity and price.
```python
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
```

### update_shopping_cart()
This function develops the necessary database parameters to update the current user's shopping cart.
```python
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
```

### remove_from_shopping_cart()
This function builds the necessary dataase request parameters to remove an item from the current user's shopping cart.
```python
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
```

### clear_shopping_cart()
This function builds the necessary database request parameters to clear the current user's shopping cart.
```python
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
```

