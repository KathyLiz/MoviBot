const processMessage = require('../helpers/processMessage');
var processM = new processMessage();

const beginLogin = require('../helpers/beginLogin');

const consultaCentros = require('../helpers/s_ubicacion');

const miID="1194773757216781";
var sender;
var login=false;
var celular="";



var latUser = null;
var lonUser = null;

module.exports = (req, res) => {
        if (req.body.object === 'page') {
            req.body.entry.forEach(entry => {
                entry.messaging.forEach(event => {
                    sender = event.sender.id;

                    if (event.message && event.message.text && sender != miID) {

                        processM.setMensaje(event.message.text);
                        processM.procesarMensaje(login, celular, sender);

                    } else if (event.account_linking) {
                        
                        if (event.account_linking.status === 'linked') {
                            login = true;
                        } else {
                            login = false;
                        }

                        beginLogin(event);
                        celular = event.account_linking.authorization_code;
                        console.log("evento del account linking: ", event);
                        
                    } else if (event.message && event.message.attachments && sender != miID) {
                        console.log ("LOS ATACHMENTS: ",event.message.attachments);
                        this.latUser = event.message.attachments[0].payload.coordinates.lat;
                        this.lonUser = event.message.attachments[0].payload.coordinates.long;
                         requestCentros(sender);
                        
                        console.log("---> attachments --->", event.message.attachments);
                    
                    } else if (event.postback && sender != miID) {

                        processM.setMensaje(event.postback.payload);
                        processM.procesarMensaje(login, celular, sender);
                        console.log("en el postback =>", event.postback.payload);

                    }

                    //console.log("Eventos: ",event);


                });
            });

        res.status(200).end();
    }
	
};

function requestCentros(sender) {
   
    var ubicacion = new consultaCentros();
    var latUsuario = latUser;
    var lonUsuario = lonUser;
    ubicacion.setLatitud(latUsuario);
    ubicacion.setLongitud(lonUsuario);
    ubicacion.setSenderId(sender);
    ubicacion.servicioCentrosCercanos();
     console.log(sender);
};

