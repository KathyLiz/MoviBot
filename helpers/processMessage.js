const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAGRZCYFZBeaKNaGnbaSihKhYKaZBBdGJaZCzmCd1qLw647P67LTKeicVTar2o1q4ZAdPwZCGciEXIZBfxbMxlBZBqmzPyOiEUZAPcZBZBd2m514wIZBhRDx7BTM7YkQXW7SFw3lRg3PIZB3AXPzV1og3fdHlJnhcxhy0NGAZDZD';

const PAGE_ID = "1194773757216781";

const API_AI_TOKEN = 'cdcf945552d748d8926c128029130e1c';
const apiAiClient = require('apiai')(API_AI_TOKEN);

//objeto que contiene la conexión al MAD
const wsM = require('./ws_miMovistarNode.js');

//objeto que contiene la estrucutura de los mensajes que se van a enviar a facebook
const payloadFacebook = require('./payloadFb.js');
var payload = new payloadFacebook();

//módulo para comunicarse con messenger
var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(FACEBOOK_ACCESS_TOKEN);

const request = require('request');

var celular1;

var textoProcesar = "";
var identificador = "";

const consultaDB = require('./s_encuesta');

var accion = null;
var numero = null;
var consulta = null;

function processMessage() {

};


processMessage.prototype.setIdentificador = function (id) {
    identificador=id;
   
};

processMessage.prototype.setMensaje = function (mensaje) {
    this.textoProcesar = mensaje
};

processMessage.prototype.procesarMensaje = function (login, celular, sender) {
    
    celular1 = celular;
    const senderId = sender;
    payload.checkWhiteList(senderId);
    console.log(celular1);
    console.log("el texto que se va a procesar: ", this.textoProcesar);

    const message = this.textoProcesar;
    var loginId= identificador;
    const apiaiSession = apiAiClient.textRequest(message, {
        sessionId: 'botcube_co'
    });
    apiaiSession.on('response', (response) => {
        
        const roberto = response.result.fulfillment.speech;

        if (response.result.action === 'saludo') {
            payload.sendTextMessage(senderId, roberto);
        } else if (response.result.action === 'saldo') {
          
           console.log("EL ID DEL login",loginId);
           console.log("EL ID DEL PROCESS MESSAGE",senderId);
            if (senderId === loginId && login === true) {
                consultarSaldo(senderId, roberto);
            } else {

                enviarLogin(senderId);
            }
        } else if (response.result.action === 'ubicacion') {
            payload.sendTextMessage(senderId, roberto);
		 } else if (response.result.action === 'espere') {
            payload.sendTextMessage(senderId, roberto);
        }
         else if (response.result.action === 'promociones') {

            messenger.sendTextMessage(senderId, roberto, function (err, body) {
                if (err) return console.error(err)
                messenger.sendReceiptMessage(senderId, payload.promociones, 'REGULAR', function (err, body) {
                    if (err) return console.error(err)
                    //función para preguntar si desea hacer algo mas
                    payload.algoMas(senderId, true);
                });

            });

        } else if (response.result.action === 'noticias') {

            messenger.sendTextMessage(senderId, roberto, function (err, body) {
                if (err) return console.error(err)
                messenger.sendReceiptMessage(senderId, payload.noticias, 'REGULAR', function (err, body) {
                    if (err) return console.error(err)
                    payload.algoMas(senderId, true);
                });

            });


        } else if (response.result.action === 'recargas') {

            if (login === false) {

                messenger.sendTextMessage(senderId, "Por favor, primero debes autenticarte", 'REGULAR', function (err, body) {
                    if (err) return console.error(err)
                    messenger.sendReceiptMessage(senderId, payload.kathy, 'REGULAR', function (err, body) {
                        if (err) return console.error(err)
                    });
                });

            } else {
                messenger.sendTextMessage(senderId, roberto, function (err, body) {
                    if (err) return console.error(err)
                    messenger.sendReceiptMessage(senderId, payload.recargas, 'REGULAR', function (err, body) {
                        if (err) return console.error(err)
                    });

                });
            }

        } else if (response.result.action === 'menu') {

            messenger.sendTextMessage(senderId, roberto, function (err, body) {
                if (err) return console.error(err)
                messenger.sendReceiptMessage(senderId, payload.menu, 'REGULAR', function (err, body) {
                    if (err) return console.error("Error en los botones del menu", err)
                });

            });
        } else if (response.result.action === 'algoMas' && response.result.resolvedQuery === "Si") {
            messenger.sendQuickRepliesMessage(sender,roberto,payload.quickRepliesMenu,"REGULAR",function(err, body) {
               if (err) return console.error(err)
           }); 
            
        } else if (response.result.action === 'algoMas' && response.result.resolvedQuery === "No") {
           messenger.sendQuickRepliesMessage(sender,"¿Nos podrías ayudar con una encuesta?",payload.quickRepliesEncuesta,"REGULAR",function(err, body) {
               if (err) return console.error(err)
           });            
        } else if (response.result.action === 'encuesta' && response.result.resolvedQuery === "Claro") {
            accion = response.result.action;
            consulta = response.result.resolvedQuery;
            guardarEncuesta(senderId);
        } else if (response.result.action === 'respuesta-encuesta' && response.result.parameters.number) {
            accion = response.result.action;
            numero = response.result.parameters.number;
            guardarEncuesta(senderId);
        } else if (response.result.action === 'despedida') {
            console.log("EN DESPEDIDA");
            if (login === true) {
                messenger.sendTextMessage(senderId, "Antes, es necesario que cierres tu sesión", function (err, body) {
                    if (err) return console.error(err)
                    messenger.sendReceiptMessage(senderId, payload.logout, 'REGULAR', function (err, body) {
                        if (err) return console.error("Error en los botones del menu", err)
                        login = false;
                    });

                });

            } else {
                console.log("despedida sin login");
                payload.sendTextMessage(senderId, roberto);
            }
        }

    });
    apiaiSession.end();

    console.log(">el login-->", login);

}


module.exports = processMessage;

function addMenuGetStarted() {
    messenger.setPersistentMenu("1194773757216781", payload.menuItems, function (err, body) {
        if (err) return console.error("Error en el menu: ", err)
        console.log("Exito -->", body);
    });

    messenger.sendThreadSettingsMessage("1194773757216781", payload.getStarted, function (err, body) {
        if (err) return console.error("Error en el boton de estarted", err)
        console.log("Get Started del body ", body);
    });
}

function enviarLogin(senderId){
   
    messenger.sendTextMessage(senderId, "Por favor, primero debes autenticarte", 'REGULAR', function (err, body) {
                    if (err) return console.error(err)
                    messenger.sendReceiptMessage(senderId, payload.kathy, 'REGULAR', function (err, body) {
                        if (err) return console.error("Error en el Login botones",err)
			console.log("El body login",body)
                    });
                });
}

function consultarSaldo(senderId, roberto) {

    MAD_CONSULTA_SALDO(function (aws) {
        var kathy = "";
        
      
        if (aws.Controles[0].Data.saldo_plan == "") {
            kathy = "\nNo tienes un plan Movistar activado";
        } else {
            kathy = "\nPlan: " + aws.Controles[0].Data.saldo_plan;
        }
        var resultBot5 = roberto + "\nRecargas: " + aws.Controles[0].Data.saldo_recarga + kathy;
        messenger.sendTextMessage(senderId, resultBot5, function (err, body) {
            if (err) return console.error(err)
            payload.algoMas(senderId, true);
        });
    });
}

function MAD_CONSULTA_SALDO(catcher) {
    var con = new wsM();
    con.setAccion('IMOVISTAR_DATOS_LINEA');
    var arg = {};
    arg.linea = celular1;
    arg.keyid = "home";
    console.log('Argumentos', arg);
    var session = {};
    session.imei = "1234567890";
    session.version = "2.2.28";
    session.id_session = "0";
    console.log('Session: ', session);
    con.setArgumentos(arg);
    con.setSession(session);
    con.servicio();

    con.setOnExito(catcher);
    con.setOnError(catcher);
};

function guardarEncuesta(senderId) {
    var cons = new consultaDB();
    var acc = accion;
    var num = numero;
    var con = consulta;
    
    cons.setAction(acc);
    cons.setNumber(num);
    cons.setQuery(con);
    cons.setSenderId(senderId);
    
    cons.servicioEncuesta();
};
