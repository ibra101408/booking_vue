const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        console.log("Request received", req.body)
        const { clientName, clientTel } = req.body;

        // Validate clientName and clientTel here (example: check if not empty)

        const sql = 'INSERT INTO clients (name, phone_number) VALUES (?, ?)';

        // Using prepared statement
        db.query(sql, [clientName, clientTel], async (err, result) => {
            if (err) {
                console.error('Error while inserting client:', err.message);
                res.status(500).json({error: "Failed to create client", details: err.message});
                return;
            }

            const clientId = result.insertId;
            console.log("Client ID: ", clientId);
            res.status(200).json({message: 'Client created successfully', clientId});
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({error: 'Internal server error', details: error.message});
    }
});

module.exports = router;
