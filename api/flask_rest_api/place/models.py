from flask_rest_api import db, ma

class Place(db.Model):
	__tablename__:"places"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(50))
	address = db.Column(db.String(100))
	price = db.Column(db.Float)


	def __repr__(self):
        return '<Place %s>' % self.Place.id

class PlaceSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "address", "price")


place_schema = RentSchema()
places_schema = RentSchema(many=True)
