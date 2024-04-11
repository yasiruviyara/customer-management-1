const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./database.js");
const bodyParser = require("body-parser");
const validator = require('email-validator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;

app.get('/user', (req, res) => {
    try {
        const sql = "SELECT * FROM customer";
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(300).json({ "error": err.message });
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
            cardNo,
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
            cardNo,
            expiryDate,
            cvv) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const params = [
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
        ];

        const email1 = email;
        const isValid = validator.validate(email1);
        if (!email1) {
            return res.status(400).json({ error: 'Email is required' });
        }
        else if (!isValid) {
            return res.status(400).json({ error: 'Email is not valid' });   
        } 
        console.log('Email is valid');

        let cardNo1 = cardNo.toString().length;       
        if(cardNo1 === 0){
            return res.status(400).json({ error: 'Card Number is required' });
        }
        else if(typeof cardNo !== "number"){
            return res.status(400).json({ error: 'Card Number is Not Number' });
        }
        else if(cardNo1 !== 12){
            return res.status(400).json({ error: 'Card Number is not valid' });
        }
        console.log('Card Number is valid');

        db.run(sql, params, function (err,result) {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            } else {
                res.status(201).json({
                "message": `Customer ${name} has registered`,
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
  
app.listen(port, () => {
    console.log(`Node Server is listening to port ${port}`);
});
  
module.exports = app;
