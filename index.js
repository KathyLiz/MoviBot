const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Se toman los parámetros del formulario, se evalúa u se redirige a messenger
app.get('/authorize', function (req, res) {
	var celular = req.query.celular;	
    var username = req.query.username;	
	var authCode="1234567890";
	var accountLinkingToken = req.query.account_linking_token;
	var redireccionURL="https://www.facebook.com/messenger_platform/account_linking"; 
	if (username === 'true')
		{
			var redirectUri = redireccionURL +'?account_linking_token='+accountLinkingToken+ '&authorization_code=' + celular;
			res.redirect(redirectUri);
		}
	else if(username === 'false')
		{
			var redirectUri = redireccionURL +'?account_linking_token='+accountLinkingToken;
			console.log ("entró al FALSE: ");
			res.redirect(redirectUri);
		}
	
	console.log("ESTE ES EL CELULAR =>",celular); 
});

app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});
app.get('/', verificationController);
app.post('/', messageWebhookController);

app.listen(3000, () => console.log('El servidor está escuchando en el puerto 3000'));








 