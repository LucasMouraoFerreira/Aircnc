from flask_rest_api import db, ma



"""Definição da classe/tabela dos usuários e seus campos"""
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    

    def __init__(self, username, password, name, email):
        self.username = username
        self.password = password
        self.name = name
        self.email = email

"""Definindo o Schema do Marshmallow para facilitar a utilização de JSON"""
class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'name', 'email', 'password')


user_schema = UsersSchema()
users_schema = UsersSchema(strict=True, many=True)