+++
title = "Testing the Checkout Endpoint"
menuTitle = "Test Checkout"
weight = 50
pre = "<b>4.9 </b>"
+++

## Test the app
Push your code changes to your repository. After the application has deployed, sign in to the website with the user you created earlier.

If you do not already have items in your shopping cart, go ahead and add a few items of various quantities to your cart and click `Check Out`.
{{< img "checkoutcart.png" "Cart to Test Checking Out">}}

Follow these steps to test the functionality of `/checkout`:
1. On the checkout page, go through the motion of filling out the shipping form.
2. After you have entered all the relevant information, submit the form.
3. If the request to checkout was successfully made to the API, you will see a prompt at the bottom of your screen thanking you for your purchase. Be sure to scroll down after submitting your form and look out for the prompt, as you will be redirected to the home page in a short amount of time.
4. Verify that there is nothing in your shopping cart.
{{< img "shoppingempty.png" "Empty Shopping Cart">}}
5. Go to your DynamoDB table through the AWS Console.
6. Filter for orders to find your order and the corresponding order items.
{{< img "checkoutddb.png" "DynamoDB Checkout Information">}}

You can expand these records to further verify all of the necessary order and order item information is present. If you were able to successfully complete all of the aforementioned steps, you can confirm that your `/checkout` endpoint and its corresponding functionality works properly.