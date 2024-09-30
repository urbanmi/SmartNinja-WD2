from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String
from sqlalchemy.orm import DeclarativeBase, mapped_column
import json


class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)


class User(db.Model):
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, unique=True, nullable=False)
    email = mapped_column(String, unique=True)
    secret_number = mapped_column(Integer)
    passwd = mapped_column(String(40))
    session_token = mapped_column(String(40))

    def __repr__(self):
        return {
            id: self.id,
            name: self.name,
            email: self.email,
        }

def get_all_users():
    select_query = db.select(User)
    return db.session.execute(select_query).scalars().all()

def get_user(user_token=None, email=None, id=None):
    if set(locals().values()) == {None}:
        return None
    
    if user_token:
        select_query = db.select(User).filter_by(session_token=user_token)
    if email:
        select_query = db.select(User).filter_by(email=email)
    if id:
        select_query = db.select(User).filter_by(id=id)
    return db.session.execute(select_query).scalar()

def add_user(email, name, password):
    user = get_user(email=email)
    if user:
        raise ValueError('User with this email already exists')

    # no user found, create new user
    hashed_pass = hashlib.sha256(password.encode()).hexdigest()
    secret = random.randint(1, MAX_SECRET)
    token = str(uuid.uuid4())

    user = User(name=name, email=email, secret_number=secret, passwd=hashed_pass, session_token=token)

    db.session.add(user)
    db.session.commit()
    
    return user
