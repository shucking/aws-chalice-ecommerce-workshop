+++
title = "Takeaways"
weight = 11
pre = "<b>1.3 </b>"
+++

## Creation, Configuration, and Deployment of Services

It really is as easy as it looks. Chalice automatically creates the necessary Lambda function and API Gateway resource with the correct permissions and configurations.

Looking back at the output message after deploying your Chalice project, you can see that it:
1. Created a default role for your Lambda Function to assume
    - In general, if your application does not require extra permissions to other AWS services, the role will have basic Cloudwatch logging permissions.
    - Chalice can automatically detect if your application needs to access other AWS services and will automatically update role permissions in future deployments.
    - You can turn off automatic role configuration as you will see later on in the workshop

2. Created the Lambda function
{{< img "lambda-console.png" "Lambda Console">}}
3. Created the corresponding Rest API in API Gateway
    - Chalice automatically configures your API's Integration Request to a with a Lambda proxy to integrate with your Lambda Function
{{< img "api-console.png" "API Console">}}
