from flask_rest_api.user.resources import UserListResource, UserResource

def initialize_routes(api):
    api.add_resource(PostListResource, '/users')
    api.add_resource(PostResource, '/users/<int:user_id>')