function Usuario(connection){
  this.connection = connection();
}

Usuario.prototype.autenticar = function(usuario,req,res){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("usuarios",function(err,collection){
      collection.find(usuario).toArray(function(err,result){
        console.log(usuario);
        if(result[0] != undefined){
          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
        }

        if(req.session.autorizado){
          res.redirect("home");
        }
        else{
          res.render("index/padrao",{validacao: {}});
        }

        mongoclient.close();
      });
    });
  });
}


module.exports = function(){
  return Usuario;
}
