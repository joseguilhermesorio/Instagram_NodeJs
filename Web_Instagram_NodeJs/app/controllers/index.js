module.exports.index = function(application, req, res){
	res.render('index/padrao',{validacao: {},msg: {}});
}

module.exports.autenticar = function(application,req,res){
	var dadosForm = req.body;

	req.assert('usuario','O nome de usuario não pode ser vazio').notEmpty();
	req.assert('senha','A senha não pode ser vazia').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('index/padrao',{validacao: erros});
		return;
	}

	const connection = application.config.dbConnection;
	const Usuarios = new application.app.models.Usuario(connection);

	Usuarios.autenticar(dadosForm,req,res);
}
