const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./database.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;


const server = app.listen(port, () => {
    console.log(`Node Server is listening to port ${port}`);
});

app.get('/user', (req, res) => {
    try {
        const sql = "SELECT * FROM customer";
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows);
        });
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
});

app.post('/user', (req, res) => {
    try {
        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardName,
            expiryDate,
            cvv
        } = req.body;

        

        const sql = `INSERT INTO customer (
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardName,
            expiryDate,
            cvv) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`;

        var params = [
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardName,
            expiryDate,
            cvv
        ];
    

        db.run(sql, params, function (err,result) {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            } else {
                res.status(201).json({
                "message": `Customer Dharmasiri has registered`,
                "customerId": this.lastID
                });
            }
        });
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  

module.exports = app;
