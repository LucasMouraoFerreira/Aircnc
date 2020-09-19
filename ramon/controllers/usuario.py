from flask import Blueprint, Response, request
import json
from ramon.modelo.usuario import db, Usuario

app = Blueprint("usuarios", __name__)


@app.route('/')
def index():
    # usuarios = Usuario.query.all()
    # result = [u.to_dict() for u in usuarios]
    rows = db.session.execute("select id, nome, idade from usuario").fetchall()
    result = [dict(r) for r in rows]
    return Response(response=json.dumps(result), status=200, content_type="application/json")

@app.route('/view/<int:id>', methods=['GET'])
def view(id):
    row = db.session.execute("select * from usuario where id = %s" % id).fetchone()
    return Response(response=json.dumps(dict(row)), status=200, content_type="application/json")

@app.route('/add', methods=['POST'])
def add():
    usuario = Usuario(request.form['nome'], request.form['idade'])
    db.session.add(usuario)
    db.session.commit()
    return app.response_class(response=json.dumps({'status': 'success', 'data': usuario.to_dict()}), status=200,
                              content_type="application/json")

@app.route('/delete/<int:id>', methods=['GET', 'DELETE'])
def delete(id):
    usuario = Usuario.query.get(id)
    db.session.delete(usuario)
    db.session.commit()
    return Response(response=json.dumps(usuario.to_dict()), status=200, content_type="application/json")

@app.route('/edit/<int:id>', methods=['PUT', 'POST'])
def edit(id):
    usuario = Usuario.query.get(id)
    usuario.nome = request.form['nome']
    usuario.idade = request.form['idade']
    db.session.commit()
    return Response(response=json.dumps(usuario.to_dict()), status=200, content_type="application/json")







