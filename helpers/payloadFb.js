const request = require('request');
const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAGRZCYFZBeaKNaGnbaSihKhYKaZBBdGJaZCzmCd1qLw647P67LTKeicVTar2o1q4ZAdPwZCGciEXIZBfxbMxlBZBqmzPyOiEUZAPcZBZBd2m514wIZBhRDx7BTM7YkQXW7SFw3lRg3PIZB3AXPzV1og3fdHlJnhcxhy0NGAZDZD';

var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger(FACEBOOK_ACCESS_TOKEN);

const PAGE_ID ="1194773757216781";
const ngrok="https://aaa350eb.ngrok.io";

var FRONTEND_URL = process.env.BOT_FRONTEND_URL || 'https://localhost';

function payloadFb () {
 
};

    
var quickReplies1 =[
      {
        "content_type":"text",
        "title":"Si",
        "payload":"si",
      },
      {
        "content_type":"text",
        "title":"No",
        "payload":"no",
      }
    ];
    
payloadFb.prototype.quickRepliesEncuesta = [
    {
        "content_type":"text",
        "title":"Claro",
        "payload":"Claro",
    },
    {
        "content_type":"text",
        "title":"No, gracias",
        "payload":"No, gracias",
    }
];

payloadFb.prototype.quickRepliesMenu = [
    {
        "content_type":"text",
        "title":"Menu",
        "payload":"menu",
    },
    {
        "content_type":"text",
        "title":"Salir",
        "payload":"salir",
    }
];

payloadFb.prototype.kathy={
        "template_type": "generic",
        "elements": [
            {
                "title": "Servicios Movistar ",
                "image_url": "http://www.eleconomista.es/CanalPDA/files/Movistar+-logo1.jpg",
                "subtitle": "Todos nuestros servicios al alcance de tu mano",
                "buttons": [
                    {
                        "type": "account_link",
                        "url":FRONTEND_URL+'/public/index.html/'
              }
            ]
          }
        ]};

payloadFb.prototype.sendTextMessage = function (senderId,text){
    var text1 = text;
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: FACEBOOK_ACCESS_TOKEN
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: text1
            },

        }
    });
};

//función para añadir dirección a lista de dominios permitidos
payloadFb.prototype.checkWhiteList = function (senderId) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
        qs: {
            access_token: FACEBOOK_ACCESS_TOKEN
        },
        method: 'POST',
        json: {
            "setting_type": "domain_whitelisting",
            "whitelisted_domains": [ngrok, "https://www.movistar.com.ec/"],
            "domain_action_type": "add"
        }
        });
		console.log(ngrok);
};

//se utiliza para borrar el menú que está incrustado en messenger
payloadFb.prototype.deleteMenu = function(senderId) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
        qs: {
            access_token: FACEBOOK_ACCESS_TOKEN
        },
        method: 'DELETE',
        json: {
            "setting_type": "call_to_actions",
            "thread_state": "existing_thread"
        }
    });
};

payloadFb.prototype.algoMas = function (senderId,variable){
	if(variable = true){
		var indicaciones = "\nDeseas hacer algo Mas?";
			messenger.sendQuickRepliesMessage(senderId,indicaciones, quickReplies1,"REGULAR", function (err, body) {
			if (err) return console.error(err)
			});
	}
}


payloadFb.prototype.getStarted = {
    setting_type: "call_to_actions",
    thread_state: "new_thread",
    call_to_actions: [
        {
            payload: "hola"
                         }
				        ]
};

payloadFb.prototype.menuItems = [
            {
              "title":"Consulta de Saldos",
              "type":"postback",
              "payload":"SALDOS"
            },
            {
              "title":"Recargas",
              "type":"postback",
              "payload":"RECARGAS"
            },            		
			{
              "title":"Noticias",
              "type":"postback",
              "payload":"NOTICIAS"
            },
            {
              "title":"Consulta centros de atención",
              "type":"postback",
              "payload":"CENTROS"
            },	
            {
              "title":"Promociones",
              "type":"postback",
              "payload":"PROMOCIONES"
            }
          ];







payloadFb.prototype.logout = {
    "template_type": "generic",
    "elements": [
        {
            "title": "Log Out ",
            "image_url": "https://previews.123rf.com/images/nbvf/nbvf1210/nbvf121000197/15972768-Salir-salida-de-emergencia-icono-dimensional-emblema-brillante-aislado-sobre-fondo-blanco-Foto-de-archivo.jpg",
            "subtitle": "Servicios Movistar",
            "buttons": [
                {
                    "type": "account_unlink"
              }
            ]
          }
        ]
};



payloadFb.prototype.promociones = {
    "template_type": "generic",
    "elements": [
        {
            "title": "Promociones Movistar ",
            "subtitle": "Mira lo que tenemos para ti",
            "image_url": "http://www.trebol-apuestas.com/wp-content/uploads/2016/09/promociones-casas-de-apuestas-online-trebol-apuestas-deportivas.jpg",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/productos-y-servicios/pospago/promociones",
                    "title": "Promociones"
              }
            ]
          }
        ]
};


payloadFb.prototype.recargas = {
    "template_type": "generic",
    "elements": [
        {
            "title": "Recarga $3 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://kingofwallpapers.com/3/3-002.jpg",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $3",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $4 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://4.bp.blogspot.com/-LrX3wIP6svw/T9EQMUwgZHI/AAAAAAAABds/G0r0m4FFyXw/s1600/N%C3%BAmeros+para+colorir+pintar+4.JPG",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $4",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $5 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://4.bp.blogspot.com/-evqWFLSMArw/T9EQM0ZJtYI/AAAAAAAABd0/Xt0BcA7fsxw/s1600/N%C3%BAmeros+para+colorir+pintar+5.JPG",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $5",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $7 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://3.bp.blogspot.com/-hQWUZ6xkXtQ/T9EQOO_RDqI/AAAAAAAABeE/vWUSusQ_l_M/s1600/N%C3%BAmeros+para+colorir+pintar+7.JPG",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $7",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $10 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://www.drodd.com/images15/10-20.jpg",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $10",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $12 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://www.sepeb.com/12/image_20170128_114645_868.jpg",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $12",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $15 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "https://freebiemom.r.worldssl.net/wp-content/uploads/2016/05/15.png",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $15",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $20 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "http://www.clipartkid.com/images/92/printable-numbers-1-30-printable-numbers-org-chWwLp-clipart.jpg",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $20",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          },
        {
            "title": "Recarga $30 ",
            "subtitle": "Recibe 2X1 en todas tus recargas",
            "image_url": "https://pbs.twimg.com/profile_images/521694603880042496/PLdOGx-B_400x400.png",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Recargar $30",
                    "payload": "espere"
              },
                {
                    "type": "postback",
                    "title": "Menu Prinicpal",
                    "payload": "menu"
              }
            ]
          }
        ]
};


payloadFb.prototype.noticias = {
    "template_type": "generic",
    "elements": [
        {
            "title": "Música sin interrupciones",
            "image_url": "https://www.movistar.com.ec/documents/10184/1259294/m-musica.png/d0c0edb9-2206-4256-9273-116dd6bb1bf4?t=1443041247071",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/musica",
                    "title": "Movistar Música"
              }
            ]
          },
        {
            "title": "Entretenimiento",
            "image_url": "http://www.utel.edu.mx/blog/wp-content/uploads/2013/04/shutterstock_99308006.jpg",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/productos-y-servicios/promociones/entretenimiento-movistar",
                    "title": "Entretenimiento"
              }
            ]
          },
        {
            "title": "Mira lo nuevo que tenemos para tí",
            "image_url": "http://www.movistar.com.pe/documents/10182/2948757/img_AZUL3_20%25.png/d007eb5e-6943-4a2d-9a20-473a0245cfd1?t=1444167681238",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/productos-y-servicios/apps",
                    "title": "Apps Movistar"
              }
            ]
          },
        {
            "title": "Corre... vuela ",
            "image_url": "http://terainfo.net/imagenes/2013/11/4g-vuela.png",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/4glte",
                    "title": "4G LTE"
              }
            ]
          },
        {
            "title": "Estamos en todas partes.. ",
            "image_url": "http://i708.photobucket.com/albums/ww87/t0p5/movistar-ecuador.jpg",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/productos-y-servicios/cobertura",
                    "title": "Cobertura"
              }
            ]
          },
        {
            "title": "Dale el ultimo adiós a tu viejo amigo ",
            "image_url": "https://www.movistar.com.ec/documents/10184/413499/banner-reciclaje.png/f1789d7a-1da6-41c8-8207-8a60dd3e1e81?t=1469830611507",
            "buttons": [
                {
                    "type": "web_url",
                    "url": "https://www.movistar.com.ec/productos-y-servicios/recicla-celular-usado",
                    "title": "Recicla tu celular usado"
              }
            ]
          }
        ]
};


payloadFb.prototype.menu = {
    "template_type": "generic",
    "elements": [
        {
            "title": "Conoce tu Saldos",
            "image_url": "http://definicion.de/wp-content/uploads/2014/07/Saldo.jpg",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Consultar Saldos",
                    "payload": "SALDOS"
              }
            ]
			},
        {
            "title": "¿Te quedaste sin saldo?",
            "image_url": "https://previews.123rf.com/images/yayayoy/yayayoy1507/yayayoy150700002/42080142-Emoticon-deprimida-y-triste-con-las-manos-en-la-cara-Foto-de-archivo.jpg",
            "buttons": [
                {
                    "title": "Recargas",
                    "type": "postback",
                    "payload": "RECARGAS"
            }
            ]
			},
        {
            "title": "¿Necesitas ayuda?",
            "image_url": "http://portal.guiasalud.es/contenidos/imagenes/Ayuda/ayuda2.gif",
            "buttons": [
                {
                    "title": "Consultar centros cercanos",
                    "type": "postback",
                    "payload": "CENTROS"
            }
            ]
			},
        {
            "title": "Mira nuestras promos",
            "image_url": "https://t3.ftcdn.net/jpg/00/76/51/42/240_F_76514201_pB15r3n7xmeBNG6FVLTyDBtEJMPjuqba.jpg",
            "buttons": [
                {
                    "title": "Promociones",
                    "type": "postback",
                    "payload": "PROMOCIONES"
            }
            ]
			},
        {
            "title": "Lo nuevo...",
            "image_url": "http://ramoscardenas-garcia.com.co/images/Noticias2.jpg",
            "buttons": [
                {
                    "title": "Noticias",
                    "type": "postback",
                    "payload": "NOTICIAS"
            }
            ]
			}
		]
};

payloadFb.prototype.quickRepliesLogin = [
    {
        "content_type": "text",
        "title": "Login",
        "payload": "login",
      },
     ];

module.exports = payloadFb;
