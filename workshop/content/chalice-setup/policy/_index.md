+++
title = "Chalice Policy"
weight = 15
pre = "<b>3.2 </b>"
+++

Your Chalice project will need to assign sufficient IAM permissions to the resulting Lambda function for access to the DynamoDB database. Without the IAM permissions, your REST API will not have access to DynamoDB and none of the functions will work.

### Config
As mentioned in the previous module, this application will use a custom policy instead of a Chalice generated policy. For this to happen, you need to tell Chalice not to automatically generate a policy by adding the **autogen_policy** option in the `config.json` and setting it to false (Note: this option does not generate when creating your project and Chalice will default to true when deploying, so it very important to set it to false if using custom policies). 

Whenever **autogen_policy** is set to false, Chalice will default to looking at `.chalice/policy-<stage-name>.json` to load permissions. For the sake of keeping all of the policies in one folder, the project structure has them in `.chalice/policies/`. Because of this, another option called **iam_policy_file** must be added to the config and it must provide the path to the desired policy file. For this project, the Chalice will read the policy from `.chalice/policies/policy-dev.json`.

At this point, the `config.json` file should look like this: 
```json
{
  "version": "2.0",
  "app_name": "chalice-workshop",
  "stages": {
    "dev": {
      "api_gateway_stage": "api",
      "autogen_policy": false,
      "iam_policy_file": "policies/policy-dev.json"
    }
  }
}
```

### Policy
You have directed Chalice to look at that file path for the policy, but now you will actually have to enter the policy into that file. [Please copy this JSON template into your `policy-dev.json`](https://github.com/madhavmehta1/aws-chalice-ecommerce-workshop/blob/master/resources/policies/policy-dev.json) file.

For every DynamoDB action in the policy, please edit the resource to point to the ARN of your DynamoDB table. For example, one of the actions looks like this:
```json
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:Query"
            ],
            "Resource": [
                "[INSERT DYNAMODB TABLE ARN]",
                "[INSERT DYNAMODB TABLE ARN]/index/GSI-1"
            ],
            "Condition": {
                "ForAllValues:StringEquals": {
                    "dynamodb:Attributes": [
                        "PK",
                        "SK",
                        "order_status",
                        "order_date",
                        "address",
                        "product_name",
                        "quantity",
                        "total_cart_price",
                        "total_item_price",
                        "price",
                        "img_url"
                    ]
                },
                "StringEquals": {
                    "dynamodb:Select": "SPECIFIC_ATTRIBUTES"
                }
            }
        }
```
Simply replace each instance of `[INSERT DYNAMODB TABLE ARN]` with the ARN.