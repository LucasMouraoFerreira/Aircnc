from flask_rest_api.rent.resources import RentListResource, RentResource

def initialize_rent_route(api):
	api.add_resource(RentListResource, '/rent')
	api.add_resource(RentResource, '/rent/<int:rent_id>')