// functions for sqlite

async function standUpDB(db) {
    db.exec('CREATE TABLE text (id INTEGER PRIMARY KEY, data TEXT);'); // create table
    let output = db.exec('SELECT name FROM sqlite_schema WHERE type="table"'); // show table(s)
    console.log(output);
    return output;
}

async function queryDB(db) {
    let output = db.exec('SELECT * FROM text;'); // query all rows 
    console.log(output);
    return output;
}

async function insertDB(db, text) {
    db.exec(`
    INSERT INTO text (data) values ${text}; // insert data
    SELECT * FROM text WHERE ID = this.lastID; // return the inserted row
    `); 
}

module.exports = {
    standUpDB, queryDB, insertDB
};