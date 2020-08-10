+++
title = "Chalice For Serverless Applications"
chapter = true
weight = 1
+++
![ChaliceLogo](/images/chalice-logo.png)

This workshop utilizes the Chalice Framework to easily develop and deploy serverless applications. Using Chalice Framework allows developers to focus on writing application code instead of worrying about configuring and deploying the necessary AWS resources. By the end of this workshop, you will have a functioning E-commerce application.

The application uses a variety of serverless AWS services to emphasize how easy it is to develop a fully serverless application with Chalice Framework. Through Chalice, Lambda and API Gateway are automatically configured to create a fully functioning Rest API.Chalice is also used to create a CI/CD pipeline with Code Pipeline. S3 is used to host a static Angular website. Amazon Cognito User Pools and Identity Pools are used for user authentication and authorization. Finally, DynamoDB is used for persistent storage of relevant user information.

![ApplicationArchitecture](/images/ecommerce-architecture.png)

{{% button href="https://issues.amazon.com/issues/create?template=f084dc94-e920-4d98-80f7-252d5cc7ce00" icon="fas fa-bug" %}}Report an issue{{% /button %}}
{{% button href="mailto:aws-sa-customer-engagements@amazon.com" icon="fas fa-envelope" %}}Contact Event Outfitters{{% /button %}}
{{% button href="https://w.amazon.com/bin/view/AWS/Teams/SA/Customer_Engagements/" icon="fas fa-graduation-cap" %}}Learn more{{% /button %}}