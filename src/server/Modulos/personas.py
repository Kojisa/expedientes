#coding=latin
import sys

sys.path.append('../')

from DBServer import DBServer
from bottle import default_app, request, hook, route,Bottle
from json import dumps


Personas = Bottle()

@Personas.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


@Personas.route('/corroborar',method='POST')
def corroborarPersona():

    db = DBServer()

    datos = request.json['datos']
    cuit = datos['cuit']
    dni = datos['dni']

    orden = 'Select * from personas where cuit = %s or dni = %s;'

    res = db.contestarQuery(orden,[cuit,dni])

    if(len(res) > 0):

        return dumps({'confirmacion':False})
    
    return dumps({'confirmacion':True})




@Personas.route('/ingresar',method='POST')
def ingresarPersona():

    db = DBServer()

    datos = request.json['datos']
    cuit = datos['cuit']

    orden = 'INSERT INTO PERSONAS (nombre,apellido,cuit,telefono1,telefono2,telefono3,calle,altura,dpto,localidad,mail)\
        VALUES (%(nombre)s,%(apellido)s,%(cuit)s,%(telefono1)s,%(telefono2)s,%(telefono3)s,\
    %(calle)s,%(altura)s,%(dpto)s,%(localidad)s,%(mail)s)'

    id = db.contestarQuery(orden,**datos,False)
    db.aceptarCambios()

    db.desconectar()

    return dumps({'id':id})

@Personas.route('/devolverPersona',method='POST')
def devolverPersona():

    db = DBServer()

    orden = request.json['datos']
    persona = datos['persona']

    orden = 'SELECT nombre,calle,altura,localidad,codpostal,tel1,tel2,tel3,mail,provincia,observaciones from personas where idpersona = %s'

    res = db.contestarQuery(orden,persona,False)

    return dumps(res[0])
    

@Personas.route('/devolverPersonas',method='POST')
def devolverPersonas():
    db = DBServer()

    datos = request.json['datos']

    orden = 'SELECT CONCAT(nombre,\' \', apellido) as nombre , cuit ,idpersona as id \
    FROM personas ORDER BY apellido DESC'
    
    res = db.contestarQuery(orden)

    db.desconectar()

    return dumps(res)


    
