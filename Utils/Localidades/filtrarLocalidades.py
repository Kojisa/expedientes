from json import load

ENTRADA = './localidades.json'

def abrirArchivo():
    arch = open(ENTRADA,'r')
    return load(arch)

def armarListado(json):

    dicAux = {}
    listaFinal = []
    listado = json['localidades']

    for posible in listado:

        if(posible['provincia']['id'] == '06' or posible['provincia']['id'] == '02'):
            dicAux[posible['localidad_censal']['nombre']] = 1
        
    print len(dicAux.keys())

def main():

    json = abrirArchivo()
    armarListado(json)

main()