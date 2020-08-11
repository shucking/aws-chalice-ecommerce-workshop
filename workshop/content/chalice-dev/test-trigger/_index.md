+++
title = "Test Post Confirmation Lambda Trigger"
menuTitle = "Test Cognito Trigger"
weight = 20
pre = "<b>4.3 </b>"
+++

## Test the app
Go to your static website and follow these steps:
1. Click Login in the top right corner
2. On the Sign In page, click the `Don't Have an Account?` button. This will redirect you to the Sign Up page.
3. Go through the motion of entering your information and click submit. This will redirect you to the Confirmation page.
4. Go to your email and copy the confirmation code that you were sent and enter it on the Confirmation page.

When you submit your confirmation code, you will be automatically logged in and redirected to the home page of the website. This state is where you will be able to verify that your Post Confirmation Trigger has worked. 
### Cognito
1. Navigate to your Cognito User Pool from the AWS Console and click on the `Users and Groups`.
2. Navigate to  'Groups' and click on your user group.
3. Check if your newly created user was added to your user group. This hits two birds with one stone because it verifies that your user was succesfully added to your user pool and it verifies that your Lambda trigger successfully added the user to your user group.
![CognitoUserGroup](/images/confirm-cognito.png)
### DynamoDB
1. Navigate to your DynamoDB table from the AWS Console.
2. Filter through the table to see if a new user record was created with your user's information
![DynamoDBUserRecord](/images/confirm-ddb.png)

    Note that your Lambda trigger will always initialize a new user's shopping cart to an empty map/dictionary.