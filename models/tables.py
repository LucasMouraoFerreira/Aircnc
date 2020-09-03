
class Rent(db.Model):
	__tablename__:"rents"

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	place_id = db.Column(db.Integer, db.ForeignKey('place.id'))

	client = db.relationship('User', foreign_keys=user_id)
	place = db.relationship('User', foreign_keys=place_id)