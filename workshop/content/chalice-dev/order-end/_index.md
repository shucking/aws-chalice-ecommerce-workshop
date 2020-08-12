+++
title = "Developing Order History Endpoint"
menuTitle = "Order History Endpoint"
weight = 60
pre = "<b>4.11 </b>"
+++

## api_endpoints.py
Import the utility function developed in the last module
```python
from chalicelib.util import get_products, get_shopping_cart, update_shopping_cart, remove_from_shopping_cart, clear_shopping_cart, checkout, order_history
```

The view function for the `/order-history` endpoint is basic, similar to the `/checkout` endpoint.
```python
@api_endpoints.route('/order_history', methods=['GET'], authorizer=authorizer, cors=cors_config)
def order_history_endpoint():
    """
    Returns a user's order history.
    :return: order_history: the list of all orders a user has made
    """
    request = api_endpoints.current_request
    user_id = 'USER#' + request.context['authorizer']['claims']['sub']
    return get_order_history(user_id)
```

