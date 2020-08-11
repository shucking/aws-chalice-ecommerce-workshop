+++
title = "Install Chalice"
weight = 9
pre = "<b>1.1 </b>"
+++
The following steps are here to help you install and initialize your Chalice Project. 

### Install Chalice

If you haven't already, please install [Python 3.7](https://docs.python.org/3/using/index.html). After installing Python, run your terminal/command interface. 

```
$ python3 pip install chalice
```
___

### Create Chalice Project

1. Navigate to the directory in which you would like to start your Chalice Project.
2. Run the following command to create your workshop:
    ```
    $ chalice new-project chalice-workshop
    ```
3. A new directory called ```chalice-workshop``` will have been created. The directory should contain the following files:
    ``` 
    $ ls -a
    .chalice    app.py    .gitignore    requirements.txt
    ```
___

### Configure AWS Credentials
In order to sync our Chalice Project with our AWS account, your AWS credentials must be configured on your machine. Keep your account's access and secret keys on hand:
```bash
$ mkdir ~/.aws
$ cat >> ~/.aws/config
[default]
aws_access_key_id=YOUR_ACCESS_KEY_HERE
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
region=YOUR_REGION (such as us-west-2, us-west-1, etc)
```

*If you are using SSO credentials, export them as environment variables via command line.*

*[If you would like a more detailed explanation of the installation, click here.](https://aws.github.io/chalice/quickstart.html)*
