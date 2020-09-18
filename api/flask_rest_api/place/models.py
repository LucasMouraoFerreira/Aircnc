from flask_rest_api import db, ma

class Place(db.Model):
	__tablename__:"places"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50))
	location = db.Column(db.String(100))
	price = db.Column(db.Float)
	type = db.Column(db.String(20))
	description = db.Column(db.String(500))
	maxNumberOfGuests = db.Colums(db.Integer)
	numberOfRooms = db.Column(db.Integer)
	numberOfBathRooms = db.Column(db.Integer)


	def __repr__(self):
        return '<Place %s>' % self.Place.id

class PlaceSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "location", "price", "type","description", "maxNumberOfGuests", "numberOfRooms", "numberOfBathRooms")


place_schema = RentSchema()
places_schema = RentSchema(many=True)
