+++
title = "Develop the Home Endpoint"
menuTitle = "Home Endpoint"
weight = 10
pre = "<b>4.1 </b>"
+++

The `/home` endpoint will be the most basic route and view function in the entire application. The view function will simply retrieve all of the products in the database and return them as a dictionary.

## util.py
At the top of your `util.py` file, import boto3
```python
import boto3
import botocore

table = boto3.resource('dynamodb').Table(os.environ['APP_TABLE_NAME'])
```

As you can see, the DynamoDB table is specified by an environment variable called `APP_TABLE_NAME`. To create environment variables for a Chalice project, you will need to add them to your `config.json` file with the **environment_variables** config option.
```json
{
  "version": "2.0",
  "app_name": "chalice-workshop",
  "stages": {
    "dev": {
      "api_gateway_stage": "api",
      "autogen_policy": false,
      "iam_policy_file": "policies/policy-dev.json",
      "environment_variables": {
          "APP_TABLE_NAME": "chalice-demo-table"
      }
    }
  }
}
```

### Standard Operations Function
Because the application will be making many requests to the database with different operations, formatted database operation requests can be passed to a standardized function and that function can then make the request to the database. This function will be utilized many times across the project.

```python
def perform_standard_operation(params):
    """
    Performs standard operations (create, read, update, query, scan)
    on DynamoDB table based on the parameter payload that was passed
    :param params: the parameters to pass for DynamoDB operation
    :return: DynamoDB operation output
    """
    operation = params['operation']
    standard_operations = {
        'create': lambda x: table.put_item(**x),
        'read': lambda x: table.get_item(**x),
        'update': lambda x: table.update_item(**x),
        'query': lambda x: table.query(**x),
        'scan': lambda x: table.scan(**x)
    }

    # Perform the operation that was sent in the params payload.
    if operation in standard_operations:
        try:
            return standard_operations[operation](params.get('payload'))
        except botocore.exceptions.ClientError as e:
            return 'Client error: {}'.format(e)
        except botocore.exceptions.ParamValidationError as e:
            raise ValueError('Parameters invalid: {}'.format(e))

    else:
        raise ValueError('Unrecognized operation "{}"'.format(operation))
```

### get_products()
This function will generate the required DynamoDB parameters retrieve all of the products in the database.
```python
def get_products():
    # Create DynamoDB request params
    params = {
        'operation': 'scan',
        'payload': {
            'ProjectionExpression': 'SK, img_url, price, product_name',
            'FilterExpression': 'begins_with(PK, :pk)',
            'ExpressionAttributeValues': {
                ':pk': 'PROD#'}}}
    response = perform_standard_operation(params)

    products = response['Items']
    return products
```

___

## api_endpoints.py
Now that you have created the utility functions required to get the products from the database, you want to add a route and view function to your `api_endpoints.py` file.
```python
@api_endpoints.route('/home', methods=['GET'], cors=cors_config)
def home_endpoint():
    """
    Returns the products from the database
    :return: products: the list of products on the application
    """
    # Call DynamoDB
    products = get_products()
    return products
```

### Understanding the parameters

Notice that the routing information looks a bit different from what you have seen so far. First of all, the route is `/home` instead of `/`. Next, there is a parameter called **methods** and it has a value of `['GET']`. This list specifies what HTTP methods are accepted on this endpoint. 

The last parameter, **cors**, can be a boolean value (true, false) to dictate whether or not to allow Cross-Origin-Resource-Sharing. Alternatively, it can be a CORSConfig object from the Chalice library - this object type can specify a CORS configuration. This route uses a CORSConfig object called `cors_config`. Currently, this object does not exist, so initialize it at the top of your file.
```python
cors_config = CORSConfig(allow_origin=os.environ['S3_BUCKET'], allow_credentials=True, allow_headers=['Content-Type', 'X-Amz-Date','Authorization', 'X-Api-Key', 'x-requested-with','Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'])
```

In this config, you will see that **allow_origin** is set to an environment variable called `S3_BUCKET`. Go to your `config.json` and make the necessary changes. For the `S3_bucket` variable, insert your S3 bucket's static hosting endpoint.
```json
{
  "version": "2.0",
  "app_name": "chalice-workshop",
  "stages": {
    "dev": {
      "api_gateway_stage": "api",
      "autogen_policy": false,
      "iam_policy_file": "policies/policy-dev.json",
      "environment_variables": {
          "S3_BUCKET": "[INSERT S3 BUCKET STATIC URL]",
          "APP_TABLE_NAME": "chalice-demo-table"
      }
    }
  }
}
```

Ultimately, this CORS configuration will ensure that Cross-Origin-Resource-Sharing is only allowed with your statically hosted website on S3.

### Test the App

You can use Chalice deploy to quickly test your app by requesting the resulting REST API from the deployment. Alternatively, you can push your code changes to your remote CodeCommit repository (created when generating a CI/CD pipeline). After the code has gone through your pipeline and your app has been deployed with CloudFormation, you can test it by accessing your static website and seeing if the Angular app loads your products. The add to cart functionality will not work yet, but this still indicates there is a connection between the front-end and backend REST API.

![TestHome](/images/test-home.png)






