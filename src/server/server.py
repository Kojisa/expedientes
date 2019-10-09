#coding=latin-1
from bottle import template, route, run, response, Bottle, hook, request,static_file,post,default_app
import xlrd
import bottle
from json import dumps,loads
import datetime
from jose import jwt
import sys

sys.path.append('./Modulos')

import dbServer

from usuarios import Usuarios

Server = Bottle()

@Server.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.add_header("Access-Control-Allow-Origin", "*")
    response.add_header("Access-Control-Allow-Methods", "POST,GET")
    response.add_header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type")
    response.add_header("Access-Control-Max-Age", "1728000")

@Server.post('/cors')
def lvambience():
    response.headers['Content-Type'] = 'application/json'
    return "[1]"





Server.mount('/usurios',Usuarios)
