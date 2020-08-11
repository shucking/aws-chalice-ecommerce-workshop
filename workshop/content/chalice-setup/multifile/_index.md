+++
title = "Multifile and Blueprints"
weight = 20
pre = "<b>3.3 </b>"
+++

From the Chalice Basics module in the beginning, recall that by default, Chalice application code created and run through the `app.py` file.
```python
from chalice import Chalice

app = Chalice(app_name='chalice-workshop')


@app.route('/')
def index():
    return {'hello': 'world'}
```

Obviously, as the application code becomes longer, putting all your view functions and route information one file becomes a liability. It does not follow best practice. Luckily, Chalice framework has a couple of ways to resolve this issue. 

## Multifile Support
Chalice has [multifile support](https://aws.github.io/chalice/topics/multifile). This allows developers to create helper and utility functions outside of `app.py` and import them in to use them. Any and all files that are used in the project that are not `app.py` must be in a directory called `chalicelib`, which is why it was created in the project structure.

For example, open `chalicelib/util.py` and add the following function to it:
```python
def hello_universe():
    return {'hello': 'universe'}
```

Now, go back to `app.py` and change the code to use your **hello_universe()** utility function.
```python
from chalice import Chalice
from chalicelib.util import hello_universe

app = Chalice(app_name='chalice-workshop')


@app.route('/')
def index():
    return hello_universe()
```

To quickly test this out, run `chalice deploy` and request the endpoint:
```bash
$ curl https://qwerty.execute-api.us-east-1.amazonaws.com/api/
{"hello": "universe"}
```

**NOTE: Remember that `__init__.py` was also created in the project structure. It does not need to be touched but it is necessary because its existence tells Chalice to package the `chalicelib` directory. This way its contents can be imported and used in the project.**

___

## Blueprints
To take this idea of breaking out application code into multiple files even further, you can use Chalice blueprints. You cannot use a multifile structure to place view functions, routes, and other decorators in other files. They MUST be in your `app.py`. Blueprints allow you to define resources and other Chalice decorators outside of `app.py`.

From the [Chalice Docs](https://aws.github.io/chalice/topics/blueprints.html):
> > The Chalice blueprints are conceptually similar to [Blueprints](https://flask.palletsprojects.com/en/1.1.x/blueprints/) in Flask. Flask blueprints allow you to define a set of URL routes separately from the main Flask object. This concept is extended to all resources in Chalice. A Chalice blueprint can have Lambda functions, event handlers, built-in authorizers, etc. in addition to a collection of routes.

For this E-commerce application, a Blueprint will be used to separate all view functions and routing information from `app.py`. This is why `chalicelib/api_endpoints.py` is in the project structure.

To build off of the previous example, implement the default route from `app.py` in `api_endpoints.py` with a Blueprint.

Open `api_endpoints.py` and follow these steps:
1. Import Blueprint from chalice
    ```python
    from chalice Import Blueprint
    ```
2. Import the utility function:
    ```python
    from chalicelib.util import hello_universe
3. Create the Blueprint
    ```python
    api_endpoints = Blueprint(__name__)
    ```
4. Implement the route and view function:
    ```python
    @api_endpoints.route('/')
    def index():
        return hello_universe()
    ```
At this point, `api_endpoints.py` should look like this:
```python
from chalice import Blueprint
from chalicelib.util import hello_universe

api_endpoints = Blueprint(__name__)

@api_endpoints.route('/')
def index():
    return hello_universe()
```


Now, go back to `app.py` and follow these steps:
1. Import the `api_endpoints` Blueprint from `api_endpoints.py`
    ```python
    from chalicelib.api_endpoints import api_endpoints
    ```
2. Register the Blueprint
    ```python
    app = Chalice(app_name='chalice-workshop')
    app.register_blueprint(api_endpoints)
    ```
3. Remove the existing route

With these updates, `app.py` should look like this:
```python
from chalicelib.api_endpoints import api_endpoints

app = Chalice(app_name='chalice-workshop')
app.register_blueprint(api_endpoints)
```

Deploy the app and test the REST API:
```bash
$ chalice deploy
...
$ curl https://qwerty.execute-api.us-east-1.amazonaws.com/api/
{"hello": "universe"}
```

**Now that you have an understanding of how Chalice can break your application into multiple files, you can remove the route and view function in the `api_endpoints.py` file. In the following sections, you will develop endpoints for the E-commerce application.**
