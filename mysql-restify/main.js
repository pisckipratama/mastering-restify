const config = require('./config/index')
const restify = require('restify');
const mysql = require('mysql2');

let connection = config.db.get;

const server = restify.createServer({
  name: config.name,
  version: config.version,
  url: config.hostname
})

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/customer', (req, res) => {
  connection.query('SELECT * FROM customer', (err, result) => {
    if (err) res.send(err);
    res.json(result);
  })
})

server.get('/customer/:id', (req, res) => {
  const getOne = [req.params.id]
  connection.query('SELECT * FROM customer WHERE Id=?', getOne, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  })
})

server.post('/customer', (req, res) => {
  const postData = req.body;
  connection.query(`INSERT INTO customer SET ?`, postData, (err, result) => {
    if (err) res.send(err);
    res.json({
      message: "data added",
      result
    })
  })
})

server.put('/customer/:id', (req, res) => {
  const putData = [req.body.name, req.body.address, req.body.country, req.body.phone, req.params.id];
  connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', putData, (err, result) => {
    if (err) res.send(err);
    res.json({
      message: "data updated",
      result
    })
  })
})

server.del('/customer/:id', (req, res) => {
  const deleteData = [req.params.id];
  connection.query('DELETE FROM `customer` WHERE `id`=?', deleteData, (err, result) => {
    if (err) res.send(err)
    res.json({
      message: "data deleted",
      result
    })
  })
})

server.listen(config.port, () => {
  console.log(`server running at ${config.hostname}:${config.port}`);
})