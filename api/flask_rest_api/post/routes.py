from flask_rest_api.post.resources import PostListResource, PostResource

def initialize_routes(api):
    api.add_resource(PostListResource, '/posts')
    api.add_resource(PostResource, '/posts/<int:post_id>')