/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
const porta = 3000;

app.listen(porta,function(){
	console.log("Servidor Online na porta "+ porta);
})
