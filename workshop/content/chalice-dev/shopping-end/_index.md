+++
title = "Develop Shopping Cart Endpoint"
menuTitle = "Shopping Cart Endpoint"
weight = 30
pre = "<b>4.5 </b>"
+++

## api_endpoints.py
Now that you have created the necessary utility functions for the `/shopping_cart` endpoint, you will need to add the routing information and view function in the `api_endpoints.py` file. During this module, you will learn about how to use authorization in Chalice to restrict access to routes.

At the top of your file, please import the functions developed in the last module.
```python
from chalicelib.util import get_products, get_shopping_cart, update_shopping_cart, remove_from_shopping_cart, clear_shopping_cart
```

Here is the route and view function:
```python
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
```

If you take a look at the decorator, you will notice a new parameter called **authorizer**. The value of this parameter can be an instance of any of the following Chalice objects: `CustomerAuthorizer`, `IAMAuthorizer`, `CognitoUserPoolAuthorizer`. When this parameter has been provided a valid parameter, it will restrict access to the associated route based on the authorizer.

This workshop will use the `CognitoUserPoolAuthorizer`. If you want to learn more about the other type of authorizers, [click here to visit the Chalice docs](https://aws.github.io/chalice/topics/authorizers.html).

Declare and initialize the authorizer for your Chalice app at the top of `api_endpoints.py`.
```python
authorizer = CognitoUserPoolAuthorizer('chalice-demo-users', header='Authorization',
                                       provider_arns=[os.environ['ARN_USER_POOL']])
```

The **provider_arns** parameter uses an environment variable called `ARN_USER_POOL`. Please add this environment variable to your `config.json`. Simply replace the value for the variable with your Cognito User Pool's ARN.
```json
{
    "version": "2.0",
    "app_name": "workshop-app",
    "stages": {
      "dev": {
        "api_gateway_stage": "api",
        "environment_variables": {
          "APP_TABLE_NAME": "chalice-demo-table",
          "ARN_USER_POOL": "[INSERT COGNITO USER POOL ARN]",
          "S3_BUCKET": "[INSERT S3 BUCKET STATIC URL]"
        },
        "autogen_policy": false,
        "iam_policy_file": "policies/policy-dev.json",
        "lambda_functions": {
          "ecommerce-new-user-trigger": {
            "autogen_policy": false,
            "iam_policy_file": "policies/trigger-dev.json"
          }
        }
      }
    }
}
```

With this authorizer configuration, anyone who tries to request the `/shopping_cart` route will have to be logged in and confirmed as Cognito User Pool user. This information will be sent through an HTTP header called `Authorization`. Users who have logged in and try to use their shopping cart will have valid `Authorization` tokens. Users who are not logged in will not be able to access a shopping cart because they will not have a valid token when they try to access a shopping cart.

This authorizer will be used in the remaining endpoints, so it is important to understand what purpose it serves before moving on.




