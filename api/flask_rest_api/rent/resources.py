from flask import request
from flask_rest_api import db
from flask_rest_api.rent.models import Rent, rent_schema, rent_schema
from flask_restful import Resource

class RentListResource(Resource):
    def get(self):
        rents = Rent.query.all()
        return rents_schema.dump(rents)

    def rent(self):
        new_rent = Rent(
            title=request.json['user_id'],
            content=request.json['place_id']
        )
        db.session.add(new_rent)
        db.session.commit()
        return rent_schema.dump(new_rent)

class RentResource(Resource):
	def get(self, rent_id):
        rent = Rent.query.get_or_404(rent_id)
        return rent_schema.dump(rent)

    def patch(self, rent_id):
        rent = Rent.query.get_or_404(rent_id)

        if 'user_id' in request.json:
            rent.user_id = request.json['user_id']
        if 'place_id' in request.json:
            rent.place_id = request.json['place_id']

        db.session.commit()
        return rent_schema.dump(rent)

    def delete(self, rent_id):
        rent = Rent.query.get_or_404(rent_id)
        db.session.delete(rent)
        db.session.commit()
        return '', 204