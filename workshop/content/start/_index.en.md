+++
title = "Getting Started"
chapter = true
weight = 5
pre = "<b>1. </b>"
+++

## Development Tools
* [git](https://git-scm.com/downloads) - Depending on your operating system, you might have to install git if it is not preinstalled

* [Python 3.7](https://docs.python.org/3/using/index.html) - This is the recommended version to use for Chalice Framework

* [Node.js/npm](https://nodejs.org/en/download/) - Installing Node.js will install the npm package manager

___

## AWS Tools

* [AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account) - Keep note of your account's Access and Secret Key credentials. [AWS recommends using SSO to generate temporary credentials for security purposes.](https://docs.aws.amazon.com/singlesignon/latest/userguide/step1.html)<br>The account must have sufficient permissions to create the following resources:
    - Lambda
    - API Gateway
    - S3
    - DynamoDB
    - Cognito User Pool and Identity Pool
    - CodeCommit
    - CodeBuild
    - CodePipeline
    - CloudFormation

* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) - The CLI will be used to deploy this workshop's CloudFormation stack.

* [Amplify Library](https://docs.amplify.aws/lib/q/platform/js) - After installing Node.js, run ```npm install aws-amplify``` in your terminal/command interface
    - _Note: Do NOT install the Amplify CLI, this project only utilizes the Amplify Library_.