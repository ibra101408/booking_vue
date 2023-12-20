const express = require('express');
const path = require("path");
const router = express.Router();
const db = require('../doc/database');


router.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        console.log("came from front  ", req.body)
        // Generate a random name for the client (you can implement a more sophisticated method)
        const {clientName, clientTel} = req.body;
        // Insert the randomly generated client into the clients table
        const sql = `INSERT INTO clients (name, phone_number)
                     VALUES ('${clientName}', '${clientTel}')`;

        db.query(sql, async (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({error: "Failed"});
                return;
            } else {

                const clientId = result.insertId;

                console.log("Client ID backend: ", clientId);

                // Handle the result (e.g., send a success message)
                res.status(200).json({message: 'Client created successfully',   clientId});
            }
        });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;
