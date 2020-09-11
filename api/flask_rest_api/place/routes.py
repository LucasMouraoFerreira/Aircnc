from flask_rest_api.place.resources import PlacetListResource, PlaceResource

def initialize_routes(api):
    api.add_resource(PlaceListResource, '/places')
    api.add_resource(PlaceResource, '/place/<int:place_id>')