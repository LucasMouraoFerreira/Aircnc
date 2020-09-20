from flask import request
from flask_rest_api import db
from flask_rest_api.user.models import User, user_schema, users_schema
from flask_restful import Resource

class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.dump(users)

    def post(self):
        new_user = User(
            username=request.json['username'],
            password=request.json['password'],
            name=request.json['name'],
            email=request.json['email']
        )
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user)

class PostResource(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user_schema.dump(user)

    def patch(self, user_id):
        user = User.query.get_or_404(user_id)

        if 'username' in request.json:
            post.title = request.json['username']
        if 'password' in request.json:
            post.content = request.json['password']
        if 'name' in request.json:
            post.content = request.json['name']
        if 'email' in request.json:
            post.content = request.json['email']

        db.session.commit()
        return user_schema.dump(user)

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return '', 204