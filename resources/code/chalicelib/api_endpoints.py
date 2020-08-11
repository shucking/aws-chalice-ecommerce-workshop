from datetime import datetime
from hashlib import sha256

from chalice import Blueprint, CognitoUserPoolAuthorizer, CORSConfig
import os

from chalicelib.models.order import Order
from chalicelib.util import perform_standard_operation, perform_batch_put, parse_order_items, \
    calculate_total_cart_price, get_shopping_cart, get_products, get_order_history, \
    get_category_filter, update_shopping_cart, clear_shopping_cart, remove_from_shopping_cart, checkout

api_endpoints = Blueprint(__name__)

authorizer = CognitoUserPoolAuthorizer('ecommerce-app-user-pool', header='Authorization',
                                       provider_arns=[os.environ['ARN_USER_POOL']])
cors_config = CORSConfig(allow_origin=os.environ['S3_BUCKET'], allow_credentials=True,
                         allow_headers=['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'x-requested-with',
                                        'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'])


@api_endpoints.route('/', authorizer=authorizer, cors=cors_config)
def index():
    return get_user_name()


# TESTING FUNCTION
def get_user_name():
    # auth_context = app.current_request.context.get('authorizer', {})
    auth_context = api_endpoints.current_request.context.get('authorizer', {})
    return auth_context


@api_endpoints.route('/home', methods=['GET'], cors=cors_config)
def home_endpoint():
    """
    Returns the products from the database
    :return: products: the list of products on the application
    """
    # Call DynamoDB
    products = get_products()
    return products


@api_endpoints.route('/shopping_cart', methods=['GET', 'POST', 'DELETE'], authorizer=authorizer, cors=cors_config)
def shopping_cart_endpoint():
    """
    Returns the current user's shopping cart after getting/updating it
    in the database
    :return: shopping_cart: the list of objects in the current user's shopping cart
    """
    request = api_endpoints.current_request
    user_id = 'USER#' + request.context['authorizer']['claims']['sub']
    shopping_cart = []
    # Create DynamoDB request params
    if request.method == 'GET':
        shopping_cart = get_shopping_cart(user_id)
        print('{} cart retrieved'.format(user_id))
    elif request.method == 'POST':
        # if request.json_body:
        shopping_cart = update_shopping_cart(user_id, request.json_body)
        print('{} cart updated'.format(user_id))
    elif request.method == 'DELETE':
        if request.json_body:
            shopping_cart = remove_from_shopping_cart(user_id, request.json_body)
            print('{} removed from {} cart'.format(request.json_body['product_name'], user_id))
        else:
            shopping_cart = clear_shopping_cart(user_id)
            print('{} cart cleared.'.format(user_id))
    return shopping_cart


@api_endpoints.route('/checkout', methods=['POST'], authorizer=authorizer, cors=cors_config)
def checkout_endpoint():
    """
    Check out items from a user's shopping cart
    :return: successful checkout message containing order id
    """
    request = api_endpoints.current_request
    order_pk = 'USER#' + request.context['authorizer']['claims']['sub']
    address = request.json_body['address']
    return checkout(order_pk, address)


@api_endpoints.route('/order_history', methods=['GET'], authorizer=authorizer, cors=cors_config)
def order_history_endpoint():
    """
    Returns a user's order history.
    :return: order_history: the list of all orders a user has made
    """
    request = api_endpoints.current_request
    user_id = 'USER#' + request.context['authorizer']['claims']['sub']
    return get_order_history(user_id)


@api_endpoints.route('/category', methods=['GET'], cors=cors_config)
def category_filter_endpoint():
    request = api_endpoints.current_request
    category = request.query_params['category']
    return get_category_filter(category)

