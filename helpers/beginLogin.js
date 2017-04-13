const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAGRZCYFZBeaKNaGnbaSihKhYKaZBBdGJaZCzmCd1qLw647P67LTKeicVTar2o1q4ZAdPwZCGciEXIZBfxbMxlBZBqmzPyOiEUZAPcZBZBd2m514wIZBhRDx7BTM7YkQXW7SFw3lRg3PIZB3AXPzV1og3fdHlJnhcxhy0NGAZDZD';

const API_AI_TOKEN = 'cdcf945552d748d8926c128029130e1c';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const wsM = require('./ws_miMovistarNode.js');

const processMessage=require("../helpers/processMessage");
var pm = new processMessage();

var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(FACEBOOK_ACCESS_TOKEN);

const request = require('request');

	const quickRepliesLogin =[
      {
        "content_type":"text",
        "title":"Consultar mi saldo",
        "payload":"saldo",
      },
	  	  {
        "content_type":"text",
        "title":"Hacer una recarga",
        "payload":"recargas",
      },
      {
        "content_type":"text",
        "title":"Menu",
        "payload":"menu",
      }
    ];
	
module.exports = (event) => {
	
	var senderId = event.sender.id;

	if(event.account_linking.status === "linked"){
	
        pm.setIdentificador(senderId);
        console.log("EL IDENTIFICADOR EN BEGIN LOGIN",senderId);
	messenger.getProfile(senderId, function (err, body) {
        console.log("el body del login",body);
	  var genero = "Bienvenida ";
	  var  userpi;
		if (err) {
			return console.error(err)
			}
		else{
				if(body.gender === "female"){
					userpi = genero+body.first_name+"! :D ";
				}
				else{
					genero = "Bienvenido ";
					userpi = genero+body.first_name +"! :D ";
				}

			var indicaciones = "\nPresiona una de las opciones o escribe lo que deseas hacer";
			messenger.sendQuickRepliesMessage(senderId,userpi+indicaciones,quickRepliesLogin,"REGULAR", function (err, body) {
			if (err) return console.error(err)
			});
			
		}		
		});
	 }	
		else{
			messenger.sendTextMessage(senderId,"Vuelve pronto!! :)");
		}
	 
};