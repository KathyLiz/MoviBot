var obj ='{"funcion":"IMOVISTAR_LOGIN","answer":{"login":{"lineaPrincipal":"984057918","claveTemporal":"1","tipoUsuario":"U","documentoID":"984057918"},"email":"christian.reinoso@bayteq.com","lineas":["984057918"],"isLogin":true}}';
var objeto =JSON.parse(obj);
console.log(objeto.answer.login.documentoID);