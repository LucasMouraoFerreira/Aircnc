from flask_rest_api import db, ma

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    content = db.Column(db.String(255))

    def __repr__(self):
        return '<Post %s>' % self.title



class PostSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "content")


post_schema = PostSchema()
posts_schema = PostSchema(many=True)