const sqlite3 = require('sqlite3').verbose();
const DB = "db.sqlite";

let db = new sqlite3.Database(DB, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`CREATE TABLE IF NOT EXISTS customer (
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            email EMAIL,
            dateOfBirth DATE,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNo INTEGER,
            expiryDate TEXT,
            cvv INTEGER,
            timeStamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.log('Table already exists');
            } else {
                console.log('Table created');
                db.run(`INSERT INTO customer (
                    name,
                    address,
                    email,
                    dateOfBirth,
                    gender,
                    age,
                    cardHolderName,
                    cardNo,
                    expiryDate,
                    cvv
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    "Yasiru Viyara",
                    "No1, Matara, Colombo", 
                    "dharmasiri@gmail.com", 
                    "2005-05-01", 
                    "male", 
                    19, 
                    "Dharmasiri", 
                    123456789123, 
                    "12/24", 
                    123
                ], (err) => {
                    if (err) {
                        console.log('Error inserting row:', err.message);
                    } else {
                        console.log('Row inserted successfully');
                    }
                });
            }
        });
    }
});

module.exports = db;


// {
//     "name": "Dharmasiri",
//     "address": "No1,Matara,Colombo",
//     "email": "dharmasiri@gmail.com",
//     "dateOfBirth": "2005.05.01", 
//     "gender": "male", 
//     "age":  19, 
//     "cardHolderName": "Dharmasiri",
//     "cardName": 123456789123, 
//     "expiryDate":  "12/24",
//     "cvv":  123              
                    
// }