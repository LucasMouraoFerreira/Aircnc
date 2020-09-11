from flask_rest_api import db, ma

class Rent(db.Model):
	__tablename__:"rents"

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	place_id = db.Column(db.Integer, db.ForeignKey('place.id'))

	def __repr__(self):
        return '<Rent %s>' % self.Rent.id

rent_schema = RentSchema()
rents_schema = RentSchema(many=True)
