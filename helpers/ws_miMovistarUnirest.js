//Example POST method invocation 
var unirest = require('unirest');

const argus ={
    "funcion": "IMOVISTAR_LOGIN", 
	"args":{"documentoID":"999013585",
			"clave":"kathy123",
				  "perfilUsuario":"Numero"},
	"session":{	"imei": "1234567890",
				"version": "2.2.28",
				"id_session":"0"}
};

const argus1 ={
    "funcion": "IMOVISTAR_DATOS_LINEA", 
	"args":{
    "linea":"998112286", 
    "keyid":"home"
},
	"session":{	"imei": "1234567890",
				"version": "2.2.28",
				"id_session":0}
};

var json = "PARAM="+JSON.stringify(argus);
console.log("HOLA");
			unirest.post('https://app.movistar.com.ec/index.php')
			.headers({'Accept': 'application/json', 'Content-type': 'application/x-www-form-urlencoded'})
			.send(json)
			.end(function (response) {
			  console.log(json);
			  console.log("RESPUESTA",JSON.stringify(response.body));
	});
 


