var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bookName text, 
            author text, 
            isbn text UNIQUE, 
            CONSTRAINT isbn_unique UNIQUE (isbn)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO books (bookName, author, isbn) VALUES (?,?,?)'
                    db.run(insert, ["A Practical Handbook of Software Construction McConnell", "Steve McConnell",
                        ("9780735619678")])
                    db.run(insert, ["user", "user@example.com", ("user123456")])
                }
            });
    }
});


module.exports = db