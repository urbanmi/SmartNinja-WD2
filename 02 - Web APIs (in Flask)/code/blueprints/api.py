from flask import Blueprint, jsonify, abort, request
from models import get_all_users, get_user, add_user


api = Blueprint('api', __name__)

@api.route('/users/')
def list():
    users = get_all_users()

    # out_users = []
    # for u in users:
    #     out_users.append(u.serialize())

    # return jsonify(out_users)

    return jsonify([u.serialize() for u in users])


@api.route('/users/<user_id>/')
def show(user_id):
    user = get_user(id=user_id)
    if not user:
        abort(404)
    
    return jsonify(user.serialize())


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

    