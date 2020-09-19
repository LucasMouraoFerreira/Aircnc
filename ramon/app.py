from flask import Flask
from ramon.modelo.usuario import db
from ramon.controllers.usuario import app as usuario_controller


app = Flask (__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usuarios.sqlite3'

app.register_blueprint(usuario_controller, url_prefix="/usuario")





if __name__ == '__main__':
    db.init_app(app=app)
    with app.test_request_context():
        db.create_all()
    app.run(debug=True)



