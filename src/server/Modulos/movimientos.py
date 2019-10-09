#coding=latin
import sys

sys.path.append('../')

from DBServer import DBServer
from bottle import default_app, request, hook, route,Bottle
from json import dumps


Movimientos = Bottle()

@Movimientos.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return

@Movimientos.route('/generarMovimiento',method='POST')
def guardarMovimiento():

    datos = request.json['datos']

    origen = datos['origen']
    destino = datos['destino']
    usuario = datos['usuario']

    expedientes = datos['expedientes']

    ordenExpedientes = 'INSERT INTO expedientesMovimientos (idmovimiento,idexpediente,recibido,padre)\
        values(%s,%s,0)'

    ordenMovimiento = 'INSERT INTO MOVIMIENTOS(origen,destino,fechaMovimiento,usuario) \
        values(%s,%s,now(),%s)'

    db = DBServer()

    idMov = db.contestarQuery(ordenMovimiento,[origen,destino,usuario],False)
    db.aceptarCambios()
    for exp in expedientes:
        db.contestarQuery(ordenExpedientes,[idMov,exp[0],exp[1]],False)
        db.aceptarCambios()

    db.desconectar()

    return dumps(idMov)


@Movimientos.route('/marcarVisto',method='POST')
def marcarVistoMovimiento():

    datos = request.json['datos']

    idMov = datos['movimiento']
    idExp = datos['expediente']
    usuario = datos['usuario']

    orden = 'update expendientesmovimientos fechaVisto = NOW(),usuarioVisto = %s where idmovimiento = %s and idexpediente = %s'
    db = DBServer()
    db.contestarQuery(orden,[usuario,idMov,idExp],False)
    db.aceptarCambios()
    db.desconectar()

@Movimientos.route('/aceptarMovimiento',method='POST')
def aceptarMovimiento():

    datos = request.json['datos']

    idMov = datos['movimiento']
    expediente = datos['expediente']

    orden = 'UPDATE expedientesmovimientos recibido = 1, fechaRecibido = now() where idexpediente = %s and idmovimiento = %s;'
    
    db = DBServer()
    db.contestarQuery(orden,[expediente,idMov],False)
    db.aceptarCambios()
    db.desconectar()

    return 

@Movimientos.route('/rechazarMovimiento',method='POST')
def rechazarMovimiento():

    datos = request.json['datos']

    idMov = datos['movimiento']
    expediente = datos['expediente']

    orden = 'UPDATE expedientesmovimientos recibido = 0, fechaRecibido = now() where idexpediente = %s and idmovimiento = %s;'
    
    db = DBServer()
    db.contestarQuery(orden,[expediente,idMov],False)
    db.aceptarCambios()
    db.desconectar()

    return 

@Movimientos.route('borrarMovimiento',method='POST')
def borrarMovimiento():

    datos = request.json['datos']

    idmov = datos['movimiento']

    ordenExpedientes = 'SELECT idexpediente FROM EXPEDIENTESMOVIMIENTOS WHERE idmovimiento = %s and recibido is not NULL'

    ordenBorrar = 'delete from movimientos where idMovimiento = %s'
    ordenBorrarExpedientes = 'delete from expedientesmovimientos where idmovimiento = %s'

    db = DBServer()
    movs = db.contestarQuery(ordenExpedientes,[idmov])
    
    if(len(movs) > 0):
        return dumps({'error':'El movimiento tiene expedientes recibidos'})
    db.contestarQuery(ordenBorrar,[idmov],False)
    db.aceptarCambios()
    db.contestarQuery(ordenBorrarExpedientes,[idmov],False)
    db.aceptarCambios()

    db.desconectar()

    return

    

    