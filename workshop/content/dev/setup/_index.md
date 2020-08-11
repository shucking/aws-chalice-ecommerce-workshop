+++
title = "Setting up the Project"
menuTitle = "Project Structure"
weight = 15
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

## Project Structure
You will want the project structure to look similar to this:
![Structure](/images/project-structure.png)