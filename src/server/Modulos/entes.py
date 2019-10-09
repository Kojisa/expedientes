#coding=latin
import sys

sys.path.append('../')

from DBServer import DBServer
from bottle import default_app, request, hook, route,Bottle
from json import dumps


Entes = Bottle()

@Entes.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


@Entes.route('/corroborarEnte',method='POST')
def corroborarEnte():

    db = DBServer()

    datos = request.json['datos']
    cuit = datos['cuit']

    orden = 'SELECT id from entes where cuit = %s'

    res = db.contestarQuery(orden,[cuit])
    if(len(res) > 0):
    
        return dumps({'confirmacion':False})
    
    return dumps({'confirmacion':True})


@Entes.route('/ingresar',method='POST')
def ingresarEnte():

    db = DBServer()

    datos = request.json['datos']
    cuit = datos['cuit']

    orden = 'INSERT INTO entes (nombre,cuit,telefono1,telefono2,telefono3,calle,altura,dpto,localidad,mail)\
        VALUES (%(nombre)s,%(cuit)s,%(telefono1)s,%(telefono2)s,%(telefono3)s,\
    %(calle)s,%(altura)s,%(dpto)s,%(localidad)s,%(mail)s)'

    id = db.contestarQuery(orden,**datos,False)
    db.aceptarCambios()

    db.desconectar()

    return dumps({'id':id})

@Entes.route('/devolver',method='POST')
def devolverEntes():
    db = DBServer()

    datos = request.json['datos']

    orden = 'SELECT nombre,cuit,idente FROM entes ORDER BY nombre DESC'
    
    res = db.contestarQuery(orden)

    db.desconectar()

    return dumps(res)


    
