+++
title = "Hosting Angular Application"
weight = 20
pre = "<b>2.3 </b>"
+++

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