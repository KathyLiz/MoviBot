var celular;
var clave;

//función para enrutar y aadir parámetros a la url
continueClicked = function () {
	
	var login = validar();
	
var username = document.getElementById('celular').value;
 
 var newLocation = '/authorize' + window.location.search;
  if (window.location.search) {
    newLocation += '&';
  } else {
    newLocation += '?';
  }
  window.location = newLocation + 'username=' + username;

};



function validar(){
	var username = 'false';
	  celular = Number( document.getElementById("celular").value);
	  clave = document.getElementById("clave").value;

	MADconexion(function (aws) {
		
		var respuesta = new Object ();
		respuesta = aws;
				
					if(respuesta.answer)
						{
							username = 'true';
							 var resultBot1 = " Bienvenido ^_^ ";
							 alert(resultBot1);
							  var newLocation = '/authorize' + window.location.search;
							if (window.location.search) 
								{
									newLocation += '&';
								} 
							else 
								{
									newLocation += '?';
								}
							window.location = newLocation + 'username=' + username +'&celular=' + celular;						 
						}  
					else
						{
							username = 'false';
							alert("ERROR: " + aws.error);
							var newLocation = '/authorize' + window.location.search;
							if (window.location.search) 
								{
									newLocation += '&';
								} 
							else 
								{
									newLocation += '?';
								}
							window.location = newLocation + 'username=' + username;	
						} 
				console.log ("RESPUESTA CORRECTA:",respuesta.answer);
				console.log ("RESPUESTA BONITA: ",respuesta.error);
				});
				
};






function MADconexion(catcher){
	
		var telefono = celular.toString();
		var con = new ws_miMovistar();
		con.setAccion('IMOVISTAR_LOGIN');
		var arg = {};
		arg.documentoID=telefono;		
		arg.clave=clave;
		arg.perfilUsuario="Numero";
		console.log('Argumentos',arg);
		var session = {};
		session.imei="1234567890";
		session.version="2.2.28";
		session.id_session="0";
		console.log ('Session: ',session);
		con.setArgumentos(arg);
		con.setSession(session);
		con.consultarHttp();
		
		con.setOnResponde (catcher);
		con.setOnError (catcher);
};

