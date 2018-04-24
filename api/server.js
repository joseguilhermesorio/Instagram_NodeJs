const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());






//Configuracoes do servidor
const port = 3000;

app.listen(port,function(){
  console.log('Servidor Online na Porta ' + port);
})


const db = mongodb.Db(
  'instagram',
  new mongodb.Server('localhost',27017,{}),
  {}
)

app.get('/',function(req,res){
  res.send({msg: 'Olá'});
});

app.post('/api',function(req,res){
  const dados = req.body;

  db.open(function(err,mongoclient){
    mongoclient.collection('postagens',function(err,collection){
      collection.insert(dados,function(err,results){
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
