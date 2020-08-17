+++
title = "Application Setup"
chapter = true
weight = 10
pre = "<b>2. </b>"
+++

[If you have not already set up your AWS CLI, please do so.](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

Please download or copy the following CloudFormation template: [`chalice-ecommerce-template.yaml`](https://github.com/madhavmehta1/aws-chalice-ecommerce-workshop/blob/master/resources/templates/chalice-ecommerce.template.yaml).

Once you have the template file on your machine, run the following command to deploy the template and create your application stack.

```bash
$ aws cloudformation deploy --template-file template.yaml --stack-name chalice-ecommerce-workshop-stack --capabilities CAPABILITY_NAMED_IAM
```

After your stack is deployed, you should receive a success message and you can confirm your deployment either through the CLI or the console. ***Be sure to keep note of the Outputs from your deployment as you will need them on hand for your application.***
![Outputs](/images/cloudformation-outputs.png)

