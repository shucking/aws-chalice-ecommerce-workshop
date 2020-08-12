+++
title = "Developing Checkout Endpoint"
menuTitle = "Checkout Endpoint"
weight = 45
pre = "<b>4.8 </b>"
+++

## api_endpoints.py
Import the checkout utility function from the last module.
```python
from chalicelib.util import get_products, get_shopping_cart, update_shopping_cart, remove_from_shopping_cart, clear_shopping_cart, checkout
```

This is the routing information and view function that needs to be added to `api_endpoints.py`:
```python
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
```

Just like the `/shopping_cart` endpoint, this endpoint uses the CognitoUserPoolAuthorizer you configured. A user can only checkout if they are logged in and have a valid `Authentication` token.