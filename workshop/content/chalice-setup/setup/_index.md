+++
title = "Project Structure"
weight = 10
pre = "<b>3.1 </b>"
+++

## Insert Products into DynamoDB
Before you develop the application code, you must insert the products into DynamoDB. To do this, please download/copy this code to a file on your machine: [`insert_products.py`](https://github.com/madhavmehta1/aws-chalice-ecommerce-workshop/blob/master/resources/code/insert_products.py)

The location of this file does not matter, but you can keep it in the root of your Chalice project. Open the file and edit line 24 by inserting your DynamoDB table's name:

```python
table = boto3.resource('dynamodb').Table('chalice-demo-table')
```

Using the command line, run the `insert_products.py` file:
```bash
$ python insert_products.py
```

This will insert all the products to your DynamoDB table and you can confirm this using the CLI or the console.

![DynamoDBTable](/images/ddb-products.png)

___

## Project Structure
### Files
Navigate to the root of your project directory and create a directory called `chalicelib` and navigate to it.
```bash
$ mkdir chalicelib
$ cd chalicelib
```

Create the following files in the subdirectory: `__int__.py`, `api_endpoints.py`, and `util.py`.
```bash
$ touch __init__.py api_endpoints.py util.py
```

Next, you will want to create a folder called `models`. For this E-commerce application, you will need a model for orders and order items.
```bash
$ cd models
$ touch order.py order_items.py
```

### Policies
Navigate back to the root directory and go to the `.chalice` subdirectory. In this subdirectory, create folder called `policies`.
Navigate to this newly created folder and create the following files: `policy-dev.json` and `trigger-dev.json`.
```bash
$ mkdir policies
$ cd policies
$ touch policy-dev.json trigger-dev.json
```

***NOTE: While Chalice does have the capability to detect application code and create the necessary policies, this E-commerce application requires more fine grained access for its components. We will be using these newly created files to insert those policies later on.***


### Final Structure

You will want the project structure to look similar to this:
![Structure](/images/project-structure.png)