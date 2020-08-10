+++
title = "Configure Angular Application"
weight = 10
pre = "<b>2.1 </b>"
+++


The Angular frontend for this Ecommerce application is [available here](https://github.com/madhavmehta1/aws-chalice-ecommerce-workshop/tree/master/resources/code). 
The frontend will be statically hosted the S3 bucket that was created during the CloudFormation deployment.

Follow these steps to download and configure the Angular application:

1. Please [clone/download](https://github.com/madhavmehta1/aws-chalice-ecommerce-workshop/tree/master/resources/code) the code onto your machine:
    ```bash
    $ git clone https://github.com/madhavmehta1/chalice-ecommerce-workshop-site.git
    ```

2. After the project is cloned, go to the root of its directory and install all the dependencies:
    ```bash
    $ npm install
    ```

3. From the root of the project directory, navigate to `src/app/` and open the `app.module.ts` file

4. Using the Outputs from the CloudFormation deployment as well as the API endpoint information from your Chalice deployment stack, edit the following code in `app.module.ts` with the respecitve information:
    ```python
    Amplify.configure({
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'INSERT HERE',
        // REQUIRED - Amazon Cognito Region
        region: 'INSERT HERE',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'INSERT HERE',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'INSERT HERE'
    },
    API: {
        endpoints: [
        {
            name: 'INSERT HERE',
            endpoint: 'INSERT HERE'
        }
        ]
    }
    });
    ```
