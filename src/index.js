'use strict'
// packages
let config = require('../config/config.json')
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
const app = express();

// start + connect to db
let db = new sqlite3.Database('../db/text.db');

// listen for requests
app.listen(config.port, () => {
    console.log('Listening on port', config.port);
})

// ingest text
// send a GET to `localhost:3000/<data>`
app.get('/:text', (req, res) => {
    var text = req.params.text
    console.log(`Request value: ${text}`)

    // standup
    if (text == 'standup') { 
        db.run('CREATE TABLE IF NOT EXISTS textStorage(name text)');
        console.log('Created "textStorage" table.')
        res.json({body: `Created 'textStorage' table.`})
        res.end();
    }
    // query
    else if (text == 'query') {
        db.all(`SELECT * FROM textStorage`, [], (err, rows) => {
            if (err) {
                throw err
            }

            const jsonArray = [];
            rows.forEach((row) => {
                jsonArray.push(row.name)
            });

            console.log(jsonArray)
            res.json({jsonArray})
            res.end();
        });
        
    }
    // drop the table
    else if (text == 'drop') {
        db.all(`DROP TABLE IF EXISTS textStorage;`, [], (err) => {
            if (err) {
              res.json({err})
              throw err;
            }
            console.log(`dropped table`)
            res.json({body: `dropped table`})
            res.end();
          });
    }  
    // insert
    else { 
        db.run(`INSERT INTO textStorage(name) VALUES(?)`, [text], function(err) {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            //res.send('Inserted ${text} into textStorage')
            res.json({body: `${text}`});
            res.end();
        });
    }
})

// empty request
app.get('/', (req, res) => {
    var text = req.params.text
    console.log(`Request: ${text}`)

    res.send({body: `Empty request. Try 'standup', 'query', or some string of text.`});
    res.end();
}) 
