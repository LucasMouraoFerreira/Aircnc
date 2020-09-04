from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = 'w8oyUPlywjAAN51OXBdfJUZ8icsRCCP7'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/exemplo_flask_rest_api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
Migrate(app,db, compare_type = True)


#############################################################################################
########################                   ROTAS              ###############################
#############################################################################################

from flask_rest_api.post.routes import initialize_routes

initialize_routes(api)