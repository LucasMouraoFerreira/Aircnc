from flask import request
from flask_rest_api import db
from flask_rest_api.rent.models import Rent, rent_schema, rent_schema
from flask_restful import Resource

class RentListResource(Resource):
    def get(self):
        rents = Rent.query.all()
        return rents_schema.dump(rents)

    def post(self):
        new_rent = Rent(
            checkinDate=request.json['checkinDate'],
            checkoutDate=request.json['checkoutDate'],
            finalPrice=request.json['finalPrice']
        )
        db.session.add(new_rent)
        db.session.commit()
        return rent_schema.dump(new_rent)

class RentResource(Resource):
    def get(self, rent_id):
        rent = Rent.query.get_or_404(rent_id)
        return rent_schema.dump(rent)

    def put(self, post_id):
        place = Place.query.get_or_404(place_id)
        
        if 'name' in request.json:
            place.name = request.json['name']

        if 'location' in request.json:
            place.location=request.json['location']
        
        if 'price' in request.json:
            place.price=request.json['price']

        if 'type' in request.json:
            place.type=request.json['type']

        if 'description' in request.json:
            place.description=request.json['description']

        if 'maxNumberOfGuests' in request.json:
            place.maxNumberOfGuests=request.json['maxNumberOfGuests']

        if 'numberOfRooms' in request.json:
            place.numberOfRooms=request.json['numberOfRooms']

        if 'numberOfBathRooms' in request.json:
            place.numberOfBathRooms=request.json['numberOfBathRooms']
            
        db.session.commit()
        return place_schema.dump(place)

     def delete(self, rent_id):
        rent = Rent.query.get_or_404(rent_id)
        db.session.delete(rent)
        db.session.commit()
        return '', 204
