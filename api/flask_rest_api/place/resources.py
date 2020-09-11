from flask import request
from flask_rest_api import db
from flask_rest_api.place.models import Place, place_schema, places_schema
from flask_restful import Resource

class PlaceListResource(Resource):
    def get(self):
        places = Place.query.all()
        return places_schema.dump(places)

    def place(self):
        new_place = Place(
            title=request.json['title'],
            address=request.json['address'],
            price=request.json['price']
        )
        db.session.add(new_place)
        db.session.commit()
        return place_schema.dump(new_place)


class PlaceResource(Resource):
    def get(self, post_id):
        place = Place.query.get_or_404(place_id)
        return post_schema.dump(post)

    def patch(self, post_id):
        place = Place.query.get_or_404(place_id)

        if 'title' in request.json:
            place.title = request.json['title']
        if 'address' in request.json:
            place.address = request.json['address']
        if 'price' in request.json['price']

        db.session.commit()
        return place_schema.dump(place)

    def delete(self, post_id):
        place = Place.query.get_or_404(place_id)
        db.session.delete(place)
        db.session.commit()
        return '', 204
