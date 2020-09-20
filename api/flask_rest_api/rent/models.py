from flask_rest_api import db, ma

class Rent(db.Model):
    __tablename__:"rents"

    id = db.Column(db.Integer, primary_key=True)
    checkinDate=db.Column(db.String(17))
    checkoutDate=db.Column(db.String(17))
    finalPrice=db.Column(db.Float) 

    def __repr__(self):
        return '<Rent %s>' % self.Rent.id

class RentSchema(ma.Schema):
    class Meta:
        fields = ("id", "checkinDate", "checkoutDate", "finalPrice")


rent_schema = RentSchema()
rents_schema = RentSchema(many=True)
