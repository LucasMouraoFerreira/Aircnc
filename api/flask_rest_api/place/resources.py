from flask import request
from flask_rest_api import db
from flask_rest_api.place.models import Place, place_schema, places_schema
from flask_restful import Resource

class PlaceListResource(Resource):
    def get(self):
        places = Place.query.all()
        return places_schema.dump(places)

    def post(self):
        new_place = Place(
            name=request.json['name'],
            location=request.json['location'],
            price=request.json['price'],
            type=request.json['type'],
            description=request.json['description'],
            maxNumberOfGuests=request.json['maxNumberOfGuests'],
            numberOfRooms=request.json['numberOfRooms'],
            numberOfBathRooms=request.json['numberOfBathRooms']
        )
        db.session.add(new_place)
        db.session.commit()
        return place_schema.dump(new_place)


class PlaceResource(Resource):


    def get(self, post_id):
        place = Place.query.get_or_404(place_id)
        return place_schema.dump(place)

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


    def delete(self, place_id):
        place = Place.query.get_or_404(place_id)
        db.session.delete(place)
        db.session.commit()
        return '', 204

