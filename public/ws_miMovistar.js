/*
ws_miMovistar.js 
version 3.4
fecha 2013-05-20
interlancompu.com
©copyright 2013
{
"min_year": 2014,
"max_year": 2014,
"min_month":0,
"max_month":12,
"max_day":30,
"min_day":0
}
*/

const WS_FUNCIONES_DEF = {			
			"IMOVISTAR_LOGIN":"IMOVISTAR_LOGIN"
};

 
function ws_miMovistar(){
	this.http = new XMLHttpRequest()
	this.http.ws_gui_idm = this;
	this.argumentos.funcion = WS_FUNCIONES_DEF.IMOVISTAR_LOGIN;
	this.argumentos.args = {};
	
};
ws_miMovistar.prototype.argumentos = {};
ws_miMovistar.prototype.resultado = {};
ws_miMovistar.prototype.session = {};
ws_miMovistar.prototype.url = "https://app.movistar.com.ec/index.php";
ws_miMovistar.prototype.http = null;
ws_miMovistar.prototype.Asincronico = true;
ws_miMovistar.prototype.ME = null;

 ws_miMovistar.prototype.consultarHttp = function(){
	//ensero el resultado
	this.resultado ={};
	
	//prepado los parametros que se envian a el ws
	var strparams = "PARAM=" +encodeURIComponent(JSON.stringify(this.argumentos));
	console.log ("JSON enviado ",this.argumentos);
	//prepado las funciones de respuesta
	this.http.onreadystatechange = this.ws_gui_idm_handle_json; //ok
	this.http.onerror = this.ws_gui_idm_handle_json_error; //error
	
	//abro la url
	this.http.open("POST", this.url, this.Asincronico);
	
	
	//aplico el hear que indica que voy a envia un paramtro past
	this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	//encodificacion de información para poder mandas simbolo +

	//envio el parametro post con el json y le dijo que consulte el resultado
	this.http.send(strparams);
	//this.http.send(strparamEncoded);
	

};

//aqui entra el resultado ok;
 ws_miMovistar.prototype.ws_gui_idm_handle_json = function(){
	if (this.ws_gui_idm.http.readyState == 4) {
		if (this.ws_gui_idm.http.status == 200) {
			var json_data = this.ws_gui_idm.http.responseText;
			
			try{
				
				this.ws_gui_idm.resultado = eval("(" + json_data + ")");
				
				var tipo = jQuery.isArray(this.ws_gui_idm.resultado);
				if (jQuery.isArray(this.ws_gui_idm.resultado)) {
					if( this.ws_gui_idm.resultado[0]=="ERROR"){
						this.ws_gui_idm.OnError(this.ws_gui_idm.resultado);
				}
					else{
						
						this.ws_gui_idm.OnResponde(this.ws_gui_idm.resultado);
						
					}
				}
				else{
				
					this.ws_gui_idm.OnResponde(this.ws_gui_idm.resultado);
				}
			}catch(err){
				
			 	ws_error = new	ws_miMovistar();
				
				para = {};
				para.error=err.message;
				ws_error.setArgumentos(para);
				ws_error.setAccion(WS_FUNCIONES_DEF.GUI_IDM_ERROR);
				ws_error.OnError = function(error){ alert(err.message);};
				ws_error.OnResponde=function(data){};
				
				ws_error.consultarHttp();
				this.ws_gui_idm.ws_gui_idm_handle_json_error(err);
			}
			
						
			} else {
				
					error = {};
					error.ERROR = "Ocurrio un problema con la URL.";
					this.ws_gui_idm.ws_gui_idm_handle_json_error(error);
					
			}
					
		}
};

ws_miMovistar.prototype.OnError = function(error){
	throw "Tienes que Implementar OnError";
};

ws_miMovistar.prototype.setOnError = function(funError){
	this.OnError=funError;
}

ws_miMovistar.prototype.ws_gui_idm_handle_json_error = function(err){
	
//console.log("ws_gui_idm_handle_json_error");
   this.OnError(err);
};

ws_miMovistar.prototype.OnResponde = function (strRespuesta){
	throw "Tienes que Implementar OnResponde";
};

ws_miMovistar.prototype.setOnResponde = function(funExito){
 this.OnResponde =funExito;
};


ws_miMovistar.prototype.setArgumentos = function(argumentos){
	this.argumentos.args = argumentos;
};

ws_miMovistar.prototype.setAccion = function(accion){
	this.argumentos.funcion = accion;
};

ws_miMovistar.prototype.setSession = function(session){
this.argumentos.session = session;
};

ws_miMovistar.prototype.Abort = function(){
	this.http.abort();
};
