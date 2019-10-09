export default class DBHandler{

    HOST = window.location.href;




    enviarPeticion(fun,url,metodo,datos,asinc=true){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            if (fun != null){
                if (this.responseText.length > 0){
                    fun(JSON.parse(this.responseText));
                }
                else{
                    fun();
                }
            }
        }
        };
        request.open(metodo,this.HOST+url,asinc);
        var datosFinales = {};
        datosFinales["datos"] = datos;
        if (metodo === "POST"){
            request.setRequestHeader('Content-type','application/json');
            request.send(JSON.stringify(datosFinales));
        }
        else {request.send();}
    }

}