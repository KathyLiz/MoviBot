
const wsM = require('../helpers/ws_miMovistarNode.js');

var app = angular.module("miApp",[]);
	
	/*app.factory("MyService", function() {
	return {
		data: {}
			};
	});*/
	
app.controller("miControl",function($scope){
	
	$scope.celular;
	$scope.clave;
	$scope.validar =function(){
		alert("Celular: " + $scope.celular+
			"\nLa clave es: "+$scope.clave);
	
	MADconexion(function (aws) {
					if(aws.isLogin === true){
							 var resultBot1 = "Bienvenido ^_^";
							 alert(resultBot1);
							 
					}

		console.log ("RESPUESTA BONITA:",aws);	
	});
}});

function MADconexion(catcher){
	
		var con = new wsM();
		con.setAccion('IMOVISTAR_LOGIN');
		var arg = {};
		arg.documentoID='999013585';		
		arg.clave='kathy123';
		arg.perfilUsuario="Numero";
		console.log('Argumentos',arg);
		var session = {};
		session.imei="1234567890";
		session.version="2.2.28";
		session.id_session="0";
		console.log ('Session: ',session);
		con.setArgumentos(arg);
		con.setSession(session);
		con.servicio();
		
		con.setOnExito (catcher);
		con.setOnError (catcher);
};