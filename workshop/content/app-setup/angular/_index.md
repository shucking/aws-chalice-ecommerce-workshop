+++
title = "Setup Frontend"
weight = 10
pre = "<b>2.1 </b>"
+++


The Angular frontend for this Ecommerce application is [available here](https://github.com/madhavmehta1/chalice-ecommerce-workshop-site/tree/524b641364c6a8c3785c7ce68531c09183a56fea). 
The frontend will be statically hosted the S3 bucket that was created during the CloudFormation deployment.
Follow these steps to host the Angular application on S3:

## Configure App Module
1. Please [clone/download](https://github.com/madhavmehta1/chalice-ecommerce-workshop-site/tree/524b641364c6a8c3785c7ce68531c09183a56fea) the code onto your machine:
    ```bash
    $ git clone https://github.com/madhavmehta1/chalice-ecommerce-workshop-site.git
    ```

2. After the project is cloned, go to the root of its directory and install all the dependencies:
    ```bash
    $ npm install
    ```

3. From the root of the project directory, navigate to `src/app/` and open the `app.module.ts` file

4. Using the Outputs from the CloudFormation deployment as well as the API endpoint information from your initial Chalice deployment, edit the following code with the respecitve information:
    ```python
    ```


## Build Angular Application
1. Navigate to the root of the cloned directory and run the following command:
    ```bash
    $ ng build --prod
    ```
   This will install all the necessary packages for this project and build the project

3. To verify that app was built, you can find the resulting build by navigating to the `/dist/workshop-angular` directory from the root of your project directory.

4. Before moving on, it is important to verify that your app was built and that the structure of the resulting build looks like this:
    ```bash
    $ cd dist/workshop-angular
    $ ls
    3rdpartylicenses.txt
    favicon.ico
    fontawesome-webfont.1e59d2330b4c6deb84b3.ttf
    fontawesome-webfont.20fd1704ea223900efa9.woff2
    fontawesome-webfont.8b43027f47b20503057d.eot
    fontawesome-webfont.c1e38fd9e0e74ba58f7a.svg
    fontawesome-webfont.f691f37e57f04c152e23.woff
    index.html
    main-es2015.313bb4a7e979c8fb3511.js
    main-es5.313bb4a7e979c8fb3511.js
    polyfills-es2015.1ea1a560738e38b47abf.js
    polyfills-es5.a702916e9ff6283ec286.js
    runtime-es2015.0dae8cbc97194c7caed4.js
    runtime-es5.0dae8cbc97194c7caed4.js
    styles.18e14798f340167cfa6f.css
    ```

___

## Upload and Host on S3

1. Navigate to S3 from the AWS Console and create a new bucket with default settings.

2. Click on the newly created bucket's `Permissions` tab and **clear the Block public access** setting. You will be asked to confirm this.
{{< img "s3-bucket-access.png" "S3 Permissions">}}

3. Click on the bucket policy tab and enter the following policy:
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::INSERT-BUCKET-NAME/*"
            }
        ]
    }
    ```

4. Upload all of the files in the `/dist/workshop-angular` directory of your Angular application to this S3 bucket.
{{< img "s3-bucket-objects.png" "S3 Bucket">}}

5. Navigate to the `Properties` tab near the top of the bucket's page and click on `Static website hosting`

6. Enable the **Use this bucket to host a website** option and set `index.html` as your Index document. Save this setting.
{{< img "s3-static-hosting.png" "S3 Static Hosting">}}

This will now make your frontend app available at the endpoint link.

For a more in depth explanation on static hosting or to learn more about static hosting on S3, [click here.](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)