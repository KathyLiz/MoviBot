//Example POST method invocation 
var unirest = require('unirest');

const funcionesUso = {
    "IMOVISTAR_LOGIN":"IMOVISTAR_LOGIN"
};

function ws_miMovistarNode() {

    ////this.argumentos.funcion = funcionesUso.IMOVISTAR_LOGIN;
    this.argumentos.args = {};
   // this.ws_gui_idm = this;
	//this.resultado = {};
	//console.log("EL EVENTO GUI_IDM es: ",this);
};

ws_miMovistarNode.prototype.argumentos = {};
ws_miMovistarNode.prototype.resultado = {};
ws_miMovistarNode.prototype.session = {};

ws_miMovistarNode.prototype.servicio = function() {
    resultado = {};
    var request = {};
    request.funcion =  this.argumentos.funcion;
    request.args =  this.argumentos.args;
    request.session = this.argumentos.session;
	
    var strparams = "PARAM=" +  JSON.stringify(request);
	
	 var holi = this;
    unirest.post('https://app.movistar.com.ec/index.php')
    .headers({'Accept': 'application/json', 'Content-type': 'application/x-www-form-urlencoded'})
    .send(strparams)
    .end(function (response) {
        resultado = response.body;
		//console.log(this);
        if (typeof resultado.error === 'undefined') {
            // exito
            holi.ws_gui_idm_handle_json_exito(resultado.answer);
        } else {
            holi.ws_gui_idm_handle_json_error(resultado.error);
			console.log("ERROR",resultado);
        }
    });
};

ws_miMovistarNode.prototype.OnExito = function(response){
    throw "Tienes que Implementar OnExito";
};

ws_miMovistarNode.prototype.OnError = function(error){
    throw "Tienes que Implementar OnError";
};

ws_miMovistarNode.prototype.setOnExito = function(funExito){
  this.OnExito =funExito;
};

ws_miMovistarNode.prototype.setOnError = function(funError){
    this.OnError=funError;
};

ws_miMovistarNode.prototype.ws_gui_idm_handle_json_error = function(err){
   this.OnError(err);
};

ws_miMovistarNode.prototype.ws_gui_idm_handle_json_exito = function(aws){
   this.OnExito(aws);
};

ws_miMovistarNode.prototype.setArgumentos = function(argumentos){
    this.argumentos.args = argumentos;
};

ws_miMovistarNode.prototype.setAccion = function(accion){
    this.argumentos.funcion = accion;
};

ws_miMovistarNode.prototype.setSession = function(session){
    this.argumentos.session = session;
};

module.exports= ws_miMovistarNode;