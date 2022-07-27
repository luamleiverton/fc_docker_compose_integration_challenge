const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
)
var sql = `CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id));`
connection.query(sql)

sql = `INSERT INTO people (name) values ('Luam');`
connection.query(sql)

sql = `SELECT * FROM people ORDER BY name`

var str_result = ''

connection.query(sql, function(err, result, fields) {

  if (err) throw err;
  
  result.forEach(element  => {
      str_result += '<p>' + element.name + '</p>'
    });    
})

connection.end()

app.get('/', (req,res) => {
  res.send('<h1>Full Cycle Rocks!</h1>' + str_result) 
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})