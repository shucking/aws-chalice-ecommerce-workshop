+++
title = "Testing the Shopping Cart Endpoint"
menuTitle = "Test Shopping Cart"
weight = 35
pre = "<b>4.6 </b>"
+++

## Test the app
Push your code changes to your repository. After the application has deployed, visit your application's website, and sign in with user you created when testing your Lambda trigger.

When you are redirected to the home page after signing in, you will notice that the shopping cart logo will have a `0` on it. This number will update as you added items to your shopping cart.

Follow these steps to test the functionality:
1. Select a random item and increment the quantity value to a random value.
2. Once you have decided on the amount, click the `Add to Cart` button associated with the item. The page will refresh and now the shopping cart logo will have a `1` on it. This confirms that something was added to your shopping cart.
3. Repeat step 1-2 with another item on the site. The shopping cart logo value will have updated to `2`.
4. Click on the shopping cart icon to view your shopping cart
{{< img "shoppingcart.png" "View of Shopping Cart">}}
5. Click on the `X` for either one of the items to remove that item from your cart. The page will refresh and now your shopping cart will only have `1` item in it. This confirms that the application was able to remove that item from your cart.
{{< img "shoppingremove.png" "Updated view of Shopping Cart">}}
6. Click on the 'Clear Shopping Cart` button. The page will refresh and now your shopping cart will be empty. This confirms that the application was able to clear your entire cart.
{{< img "shoppingempty.png" "Empty Shopping Cart">}}

If you were able to complete all of these steps with the expected outcomes, you can confirm that all shopping cart functionality is working correctly. If not, please review the [**Shopping Cart Utility**](/chalice-dev/shopping-util.html) and the [**Shopping Cart Endpoint**](/chalice-dev/shopping-end.html) sections to make sure you have not missed any steps.