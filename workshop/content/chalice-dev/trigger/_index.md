+++
title = "Post Confirmation Cognito Trigger"
menuTitle = "Cognito Trigger"
weight = 15
pre = "<b>4.2 </b>"
+++

For this E-commerce application, there are some operations that need to occur outside of the REST API. The CloudFormation template used in the [Application Setup](/app-setup.html) section created a Cognito User Pool Group for the E-commerce users. The group was attached with an IAM role so that every user on the application would assume that role when logged in. Therefore, when a new user confirms their account with Cognito, that user needs to be added to that Cognito User Pool Group. Furthermore, each new user needs a new record in the DynamoDB table. Both of these things can be done by setting a Lambda function with the necessary code as a [Cognito Post Confirmation trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-post-confirmation.html).

If you recollect from the Chalice Basics module at the beginning of the workshop, it was mentioned that Chalice has a `lambda_function()` decorator. Using this decorator, you can create a pure lambda function that is independent from the API handler function that Chalice creates and deploys. This means your deployment will create two Lambda functions. Generally, this is a very useful feature, because your application might need to leverage more Lambda functions that are not related to the REST API.

This decorator will be used to create the Cognito Post Confirmation Lambda trigger.

### Function Code
For this part, you can decide to create the pure lambda function within your `app.py` or create a Blueprint of a lambda function. If you decide to use a Blueprint, just remember to import and register the Blueprint in your `app.py` file.

```python
@app.lambda_function(name='ecommerce-new-user-trigger')
def lambda_new_user_trigger(event, context):
    """
        Lambda function that adds user to preconfigured Cognito user group and creates
        a DynamoDB record for the user.
        The function is triggered when a new user is confirmed through Cognito.
    """

    """
    Add user to Cognito Group
    """
    cognito_provider = boto3.client('cognito-idp')

    # Verify that the user is confirmed and their email is verified
    if event['request']['userAttributes']['cognito:user_status'] == 'UNCONFIRMED' or \
            event['request']['userAttributes']['email_verified'] == 'false':
        return "User is not confirmed and/or user email is not verified."

    # Add user to cognito group and except errors.
    try:
        response = cognito_provider.admin_add_user_to_group(UserPoolId=event['userPoolId'], Username=event['userName'],
                                                            GroupName='chalice-user-auth_policy')
    except cognito_provider.exceptions.InvalidParameterException as e:
        return e
    except cognito_provider.exceptions.ResourceNotFoundException as e:
        return e
    except cognito_provider.exceptions.TooManyRequestsException as e:
        return e
    except cognito_provider.exceptions.NotAuthorizedException as e:
        return e
    except cognito_provider.exceptions.UserNotFoundException as e:
        return e
    except cognito_provider.exceptions.InternalErrorException as e:
        return e
    print({'success': True, 'message': 'User was successfully added to specified Cognito user group.'})

    """
    Add user to DynamoDB table
    """
    table = boto3.resource('dynamodb').Table(os.environ['APP_TABLE_NAME'])
    json_address = json.loads(event['request']['userAttributes']['address'])
    address_type = json_address['address_type']
    address = {
        address_type: json_address
    }
    user_info = {
        'PK': 'USER#' + event['request']['userAttributes']['sub'],
        'SK': 'USER#' + event['request']['userAttributes']['sub'],
        'username': event['userName'],
        'addresses': address,
        'shopping_cart': {},
        'date_created': datetime.now().isoformat()
    }

    # Add user information to DynamoDB and except errors.
    try:
        response = table.put_item(Item=user_info)
    except table.exceptions.ResourceNotFoundException as e:
        return e
    except table.exceptions.InternalServerError as e:
        return e
    except table.exceptions.TransactionConflictException as e:
        return e
    except table.exceptions.RequestLimitExceeded as e:
        return e

    print(response)
    return event
```

### Function Policy
Because this is completely different Lambda function, you will need to assign it the correct permissions to access DynamoDB and Cognito, otherwise this function will not work.

Navigate to `.chalice/` and open your `config.json` file. You will need to add and configure the **lambda_functions** option. 
```json
{
    "version": "2.0",
    "app_name": "workshop-app",
    "stages": {
      "dev": {
        "api_gateway_stage": "api",
        "environment_variables": {
          "APP_TABLE_NAME": "chalice-demo-table",
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

Looking at the decorator for the lambda function, you can see that the name parameter is `ecommerce-new-user-trigger`. You can change this if desired. The config will need to match this name. The options **autogen_policy** and **iam_policy_file** need to be set as well. In this case, you will need to use a custom policy document so set them to `false` and `policies/trigger-dev.json`.

You have now directed Chalice to not auto generate a policy for this Lambda function and have specified the file path to the policy document that it should load. Now you need to set the policy at that file.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "cognito-idp:AdminAddUserToGroup"
            ],
            "Resource": [
                "[INSERT DYNAMODB TABLE ARN]",
                "[INSERT COGNITO USER POOL ARN]"
            ]
        }
    ]
}
```

### Configure Cognito User Pool
Push your code changes to your repository. Once the application has deployed, you will want to configure your Cognito user pool to use it. From the AWS Console, navigate to Cognito User Pools and click on your User Pool. On the left-hand side panel, click on the option that says **Triggers**. Scroll to find the **Post confirmation** trigger and select your newly deployed trigger.
![Trigger](/images/trigger-config.png)


