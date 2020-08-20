import json

from chalice import Chalice
import boto3
import boto3.exceptions
import os
from datetime import datetime

from chalicelib.api_endpoints import api_endpoints

app = Chalice(app_name='workshop-app')
app.experimental_feature_flags.update(['BLUEPRINTS'])
app.register_blueprint(api_endpoints)
app.debug = True


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
                                                            GroupName='ecommerce-users')
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
