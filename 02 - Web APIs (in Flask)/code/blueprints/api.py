from flask import Blueprint, make_response
from models import get_all_users

api = Blueprint('api' , __name__)

@api.route('/list_all_users')
def list():
    users = get_all_users()

    out = ''
    for u in users:
        out += f'{u.id},{u.name},{u.email}\n'

    response = make_response(out)
    response.mimetype = 'text/plain'
    return response