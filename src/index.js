// components
// http server - two routes, text and read
// text adds a string to a sqlite table
// read reads all data from that table
'use strict'

// packages
let config = require('../config/config.json')
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let sqlCommands = require('./sql');

// constants
const app = express();
//const router = express.Router();

// start in memory db
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
});

// listen for requests
app.listen(config.port, () => {
    console.log('Listening on port', config.port);
})

// ingest text
// send a GET to `localhost:3000/<data>`
app.get('/:text', (req, res) => {
    var text = req.params.text

    res.send(text)
    console.log(text)

    // decide what to do
    // standup
    if (text == 'standup') { 
        let output = sqlCommands.standUpDB()
        console.log('standing up db ...');
        console.log(output) //res.send() later
    }
    //query
    else if (text == 'query') {
        let output = sqlCommands.queryDB()
        console.log('querying all data ...');
        console.log(output) //res.send() later
    } 
    // insert
    else { 
        let output = sqlCommands.insertDB(text)
        console.log('inserting into table ...'); 
        console.log(output) //res.send() later
    }
})

// close db conn
db.close()