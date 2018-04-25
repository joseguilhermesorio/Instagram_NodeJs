const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;
const multiParty = require('connect-multiparty');
const fs = require('fs');
const fsx = require('fs-extra');

const app = express();

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiParty());




//Configuracoes do servidor
const port = 5000;

app.listen(port,function(){
  console.log('Servidor Online na Porta ' + port);
})


const db = mongodb.Db(
  'instagram',
  new mongodb.Server('localhost',27017,{}),
  {}
)

app.get('/',function(req,res){
  res.send({msg: 'Bem Vindo a Aplicacao NodeJs'});
});

//Inserir dados na Api
app.post('/api',function(req,res){

  res.setHeader("Access-Control-Allow-Origin","*");

  const dados = req.body;

  console.log(req.files)
  // var path_destino = './uploads/' + req.files.arquivo.originalFilename;
  //
  // fs.rename("./tmp/", path_destino, function(err){
  //   if(err){
  //     res.status(500).json({error: err});
  //     return;
  //   }

    // db.open(function(err,mongoclient){
    //   mongoclient.collection('postagens',function(err,collection){
    //     collection.insert(dados,function(err,results){
    //       if(err){
    //         res.json(err);
    //       }
    //       else{
    //         res.json(results);
    //       }
    //
    //       mongoclient.close();
    //     });
    //   });
    // });
   // });
});

//Consultar dados da api
app.get('/api',function(req,res){
  db.open(function(err,mongoclient){
    mongoclient.collection("postagens",function(err,collection){
      collection.find().toArray(function(err,results){
        if(err){
          res.json(err);
        }
        else{
          res.json(results);
        }

        mongoclient.close();
      });
    });
  });
});

//Consultar dados da Api pelo ID
app.get('/api/:id',function(req,res){
  db.open(function(err,mongoclient){
    mongoclient.collection("postagens",function(err,collection){
      collection.find({_id : objectId(req.params.id)}).toArray(function(err,results){
        if(err){
          res.json(err);
        }
        else{
          res.json(results);
        }

        mongoclient.close();
      });
    });
  });
});

//Atualizar dados da Api pelo ID
app.put('/api/:id',function(req,res){
  db.open(function(err,mongoclient){
    mongoclient.collection("postagens",function(err,collection){
      collection.update(
        {_id: objectId(req.params.id)},
        {$set: {titulo: req.body.titulo}},
        function(err,results){
          if(err){
            res.json(err);
          }
          else{
            res.json(results);
          }

          mongoclient.close();
        }
      );
    });
  });
});

//Delete dados da Api
app.delete('/api/:id',function(req,res){
  db.open(function(err,mongoclient){
    mongoclient.collection("postagens",function(err,collection){
      collection.remove({ _id : objectId(req.params.id) },function(err,results){
        if(err){
          res.json(err);
        }
        else{
          res.json({msg: 'O post foi deletado com sucesso!'});
        }
        mongoclient.close();
      });
    });
  });
})
