+++
title = "Chalice Development"
chapter = true
weight = 20
pre = "<b>4. </b>"
+++

In this section, you will develop the backend services of the E-commerce application.

## REST API:
#### /home
This endpoint will return all of the products in the database
#### /shopping_cart
This endpoint will route requests to get and update the current user's shopping cart
#### /checkout
This endpoint will route requests to checkout the current user's current shopping cart
#### /order_history
This endpoint will route request to view the current user's order history

## Lambda
#### API Handler
This will handle and respond to API requests.
#### Cognito Post Confirmation Trigger
This will trigger every time a new user confirms their account with Cognito.