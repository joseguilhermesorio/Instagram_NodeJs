const mongodb = require('mongodb');

const conexao = function(){
  const db = new mongodb.Db(
    'instagram',
    new mongodb.Server(
      'localhost',
      27017,
      {}
    ),
    {}
  );
  return db;
}

module.exports = function(){
  return conexao;
  console.log(conexao)
}
