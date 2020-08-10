+++
title = "Chalice Basics"
weight = 10
pre = "<b>1.2 </b>"
+++

## Understanding the Basics

If you have used Flask framework before, you have probably used decorators such as ```route()``` or ```endpoint()``` to link a function to your API calls. Chalice has similar decorators and many more that can give your application functions higher order functionality.

If you would like to learn more about decorators, here are some helpful resources:
<br>
  - [Function decorators in Python.](https://docs.python.org/3.7/whatsnew/2.4.html#pep-318-decorators-for-functions-and-methods)
<br>
  - [Decorators in Flask.](https://flask.palletsprojects.com/en/1.1.x/api/#)

Take a look at ```app.py``` in your project directory:
```python
from chalice import Chalice

app = Chalice(app_name='chalice-workshop')


@app.route('/')
def index():
    """
    Returns a dictionary at API route '/'
    """
    return {'hello': 'world'}
```

When a request is made to the ```/``` endpoint, the response is returned by the ```index()``` function.

___

## Understanding the Config file

To view the config file, you will want to navigate to the root of your Chalice project and go to the ```.chalice/``` sub directory. In this directory, you will see a file called ```config.json```. When a new project is created, Chalice generates a default configuration:

```json
{
  "version": "2.0",
  "app_name": "chalice-workshop",
  "stages": {
    "dev": {
      "api_gateway_stage": "api"
    }
  }
}
```

Chalice can create and handle your application configurations based on a specified deployment stage in your deployment environment. By default, a ```dev``` stage is created, but you can add more later to create a proper deployment environment. 

*[To learn more about the config file and various config options, visit the documentation.](https://aws.github.io/chalice/topics/configfile.html#configuration-file)*

___

## Deploy Chalice Application

You can test the API by deploying the application to AWS. **This will require your AWS credentials to be configured, so please do so if you have not already.**

Navigate to the root of your chalice application and deploy the application:

```
$ cd chalice-workshop/
$ chalice deploy
```

Your output should look similar to this:

```bash
Creating deployment package.
Creating IAM role: chalice-workshop-dev
Creating lambda function: chalice-workshop-dev
Creating Rest API
Resources deployed:
  - Lambda ARN: arn:aws:lambda:us-east-1:12345:function:chalice-workshop-dev
  - Rest API URL: https://qwerty.execute-api.us-east-1.amazonaws.com/api/
```

___

## Test Chalice Application

By visiting the Rest API Url from the deployment, you should be able to see that your endpoint succesfully returns the dictionary object from the return statement in the ```index()``` function.

```bash
$ curl https://qwerty.execute-api.us-east-1.amazonaws.com/api/
{"hello": "world"}
```

___

## View your Deployment Information

Once your Chalice project is deployed, from the root of your of the project navigate to ```.chalice/deployed```. You should see a file called ```dev.json```. This file contains all the relevant information about the resources Chalice created in AWS for the ```dev``` stage.

```json
{
  "resources": [
    {
      "name": "default-role",
      "resource_type": "iam_role",
      "role_arn": "arn:aws:iam::12345:role/chalice-workshop-dev",
      "role_name": "chalice-workshop-dev"
    },
    {
      "name": "api_handler",
      "resource_type": "lambda_function",
      "lambda_arn": "arn:aws:lambda:us-east-1:12345:function:chalice-workshop-dev"
    },
    {
      "name": "rest_api",
      "resource_type": "rest_api",
      "rest_api_id": "qwerty",
      "rest_api_url": "https://qwerty.execute-api.us-east-1.amazonaws.com/api/"
    }
  ],
  "schema_version": "2.0",
  "backend": "api"
}
```
