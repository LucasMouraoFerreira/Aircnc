from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt import JWT
from flask_rest_api.authentication.functions import authenticate, identity


app = Flask(__name__)
app.config['SECRET_KEY'] = 'w8oyUPlywjAAN51OXBdfJUZ8icsRCCP7'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/exemplo_flask_rest_api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
Migrate(app,db, compare_type = True)

#jwt = JWT(app, authenticate, identity)


#############################################################################################
########################                   ROTAS              ###############################
#############################################################################################

from flask_rest_api.post.routes import initialize_routes
from flask_rest_api.rent.routes import initialize_rent_route
from flask_rest_api.place.routes import initialize_place_routes

initialize_routes(api)
initialize_rent_route(api)
initialize_place_routes(api)