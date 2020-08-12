+++
title = "Developing Order History Utility"
menuTitle = "Order History Utility"
weight = 55
pre = "<b>4.10 </b>"
+++

## util.py
There is only one utility function that needs to be created for the `/order-history` endpoint.
### get_order_history()
This function generates the necessary DynamoDB request parameters to retrieve the current user's order history.
```python
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
```

Notice that the function performs two queries: the first query is to retrieve all of the orders associated with the current user and the second query is to retrieve every order item associated with each of the orders retrieved from the first query.