# Lesson 02 - Web APIs (in Flask)

Why: standardized and consistent interface for cross-platform integration

## Agenda

- What are APIs, what are the qualities of a good API
- Create a REST API endpoint in Flask - GET Users
- What is REST
- Create RESTfull API

## Create an API

Create a new file **/blueprints/api.py** with the following:

```diff
+from flask import Blueprint, make_response
+from models import get_all_users
+
+api = Blueprint('api', __name__)
+
+@api.route('/list_all_users')
+def list():
+    users =  get_all_users()
+    
+    out = ''
+    for u in users:
+        out += f'{u.id},{u.name},{u.email}\n'
+    
+    resp = make_response(out)
+    resp.mimetype = 'text/plain'
+    return resp

```

Change **/main.py**

```diff
 from models import User, db, get_all_users, get_user
 import uuid
 import hashlib
 import json
+from blueprints import api
 
 app = Flask(__name__)
 
 db.init_app(app)
 with app.app_context():
     db.create_all()
 
+
+app.register_blueprint(api.api, url_prefix='/api')
+
 MAX_SECRET = 30

```

With this we have created a simple API for listing all users from the database. You can check the data from the url `/api/list_all_users`.

- Why can we call this an API?
- What is wrong with it, what could be improved?

## What are APIs

The main motivation for an API is to provide an interface for applications (computers) to talk to each-other. When designing an API a developer should me mindful at the following things:
- be consistent/standardized
  - url
  - http verbs
- enable its users to create, read, update, delete the content (post, get, put, delete) CRUD.
- hide the inner implementation
- be easy to use from a client side
- be able to be secured
- use the language easily understood by JavaScript (XML or preferably JSON)

## REST and REST-full APIs

REST (Representational State Transfer) is a set of guidelines to create a good web API.
- **client-server architecture**
- **uniform interface**
  - Resource Identification: Resources are identified by unique URIs
  - Resource Manipulation through Representations: Resources can have multiple representations (e.g., JSON, XML), and clients interact with these representations to perform actions on resources.
  - Self-Descriptive Messages: Messages (requests and responses) include information about how to process the message, whether it be through HTTP headers or within the message itself.
  - Hypermedia as the Engine of Application State (HATEOAS): Clients interact with the application entirely through hypermedia provided dynamically by application servers. This allows clients to navigate the application's capabilities without prior knowledge.
- **Cacheability:** Responses from the server can explicitly  indicate whether they can be cached or not. This improves performance by allowing clients to cache responses and reduce the need for repeated  requests.
- **stateless communication**: Each request from a client to the server must contain all the  information needed to understand and fulfill that request. The server  does not store information about the client's state between requests.
  The benefits of statelessness are:
  - **Simplicity and Scalability:** Stateless APIs are simpler to design and implement. Since each request is independent and self-contained, it makes the system more scalable. The server can handle each request without being burdened by the need to manage and store information about the client's state.
  - **Ease of Maintenance and Upgrades:** Stateless APIs are easier to maintain and upgrade. Changes to the server or the API itself can be implemented without affecting the client's state, as each request provides all the necessary information. This makes it easier to roll out updates, fix bugs, and introduce new features without disrupting the entire system.
  - **Better Performance:** Stateless APIs can be more performant because the server does not need to keep track of client states between requests. This reduces the overhead associated with managing stateful connections and allows the server to process requests more efficiently.
  - **Improved Reliability:** Stateless communication makes it easier to recover from failures. If a server goes down, clients can resend their requests without worrying about the server maintaining a particular state. The lack of server-side state simplifies recovery and ensures that the system can handle intermittent failures more gracefully.
  - **Load Balancing:** Stateless APIs are well-suited for load balancing scenarios. Requests from clients can be distributed across multiple servers without concerns about session affinity or sticky sessions, as each request contains all the necessary information for the server to process it independently.
  - **Better Caching:** Stateless nature allows for easier caching mechanisms. Responses from the server can be cached based on the request parameters without worrying about the server maintaining session-specific data. This improves overall system performance by reducing the need to regenerate the same responses repeatedly.
  - **Scalability in Microservices Architecture:** Stateless APIs align well with microservices architecture, where services are designed to be independent and self-contained. Each microservice can operate without relying on shared state, making it easier to scale individual services horizontally.
  - **Cross-Platform Compatibility:** Stateless APIs make it simpler to build cross-platform applications. Since each request contains all the necessary information, clients built using different technologies or running on different platforms can interact with the API without compatibility issues related to session management.

## Create a RESTfull API

Create an API as a Flask Blueprint in the file **/blueprints/api.py**

```python
from flask import Blueprint, jsonify, abort, request
from models import get_all_users, get_user, add_user, update_user, delete_user

api = Blueprint('api', __name__)

@api.route('/users/')
def list():
    users =  get_all_users()
    
    return jsonify([u.serialize() for u in users])

```

change **main.py**

```diff
 from models import User, db, get_all_users, get_user, add_user
 import uuid
 import hashlib
 import json
+from blueprints import api
 from config import MAX_SECRET
 
 app = Flask(__name__)
 
 with app.app_context():
     db.create_all()
 
+app.register_blueprint(api.api, url_prefix='/api')
+
```

and add serialization to the User class in **model.py**:

```diff
 class User(db.Model):
             name: self.name,
             email: self.email,
         }
+    
+    def serialize(self):
+        return {   
+            'id': self.id,
+            'name': self.name,
+            'email': self.email,
+        }
+    
 
 def get_all_users():
```

This gives us the first functionality - listing users.

What other functionalities do we need?

### Get single

```python
@api.route('/users/<int:user_id>')
def show(user_id):
    user =  get_user(id=user_id)
    if not user:
        return abort(404)
    
    return jsonify(user.serialize())
```

### Create

in **/blueprints/api.py**

```python
@api.route('/users/', methods=['POST'])
def store():
    body = request.get_json()
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)

    try:
        user = add_user(email=email, name=name, password=password)
        return jsonify({
            'success': True,
            'created': user.serialize()
        })
    except:
        abort(422)

```

Use the `add_user` function in the **model.py**

### Update

```python
@api.route('/users/<int:user_id>', methods=['PUT'])
def update(user_id):
    body = request.get_json()
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)

    try:
        user = update_user(id=user_id, email=email, name=name, password=password)
        return jsonify({
            'success': True,
            'updated': user.serialize()
        })
    except:
        abort(422)

```

We don't have the update function in the **model.py** yet, let's add that:

```python
def update_user(id:int, email=None, name=None, password=None):
    user = get_user(id=id)
    if not user:
        abort(404)
    if email and email != '':
        user.email = email
    if name and name != '':
        user.name = name
    if password and password != '':
        user.password = hashlib.sha256(password.encode()).hexdigest()

    db.session.add(user)
    db.session.commit()

    return user
```

### Delete

```python
@api.route('/users/<int:user_id>', methods=['DELETE'])
def destroy(user_id):

    try:
        user = delete_user(id=user_id)
        return jsonify({
            'success': True,
            'deleted': f'<User id:{user_id}>'
        })
    except:
        abort(422)
```

and the delete function in the **model.py**:

```python
def delete_user(id:int):
    user = get_user(id=id)
    if not user:
        abort(404)

    db.session.delete(user)
    db.session.commit()

    return True
```

**PUT vs PATCH**



## Homework

- Implement the missing API endpoints
- Document your API using Swagger Editor: https://editor.swagger.io/

## See more

- https://en.wikipedia.org/wiki/API
- https://restfulapi.net/
- https://www.usebruno.com/compare/bruno-vs-postman
