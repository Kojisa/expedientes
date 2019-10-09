#coding=latin
import sys

sys.path.append('../')

from DBServer import DBServer
from bottle import default_app, request, hook, route,Bottle
from json import dumps
from jose import jwt

Usuarios = Bottle()

@Usuarios.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


@Usuarios.route('/bloquear',method='POST')
def bloquearUsuario():

    datos = request.json['datos']
    usuario = datos['usuario']

    orden = 'update usuarios set bloqueado = 1 where idusuario = %s;'

    db = DBServer()

    db.contestarQuery(orden,[usuario],False)
    db.aceptarCambios()

    db.desconectar()


@Usuarios.route('/login',method='POST')
def login():

    datos = request.json['datos']
    usuario = datos['usuario']
    contra = datos['contra']


    db = DBServer()

    orden = 'SELECT contra,bloqueado FROM usuarios WHERE idusuario = %s;'

    res = db.contestarQuery(orden,[usuario,contra])
    if(len(res) == 0):
        return dumps({
            'token':None,
            'error':'Usuario no encontrado'
        })
    
    ps = res[0]['contra']
    bloqueado = res[0]['bloqueado']
    if(contra != res or bloqueado == 1):
        return dumps({
            'token':None,
            'error':'Contraseña erronea'
        })
    
    ordenPermisos = 'SELECT idusuario,iddependencia,carga,consulta,borra,mueve FROM usuarios where usuario = %s'

    res = db.contestarQuery(orden,[usuario])[0]

    dic = {
        'id':res['idusuario'],
        'dependencia':res['iddependencia'],
        'carga':res['carga'],
        'consulta':res['consulta'],
        'borra':res['borra'],
        'mueve':res['mueve'],
        'usuario':usuario
    }

    token = jwt.encode(dic,'expedientes')
    return dumps({"token":token})
    

