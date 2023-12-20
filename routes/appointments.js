const express = require('express');
const path = require("path");
const router = express.Router();
const db = require('../doc/database');


router.post('/', async (req, res) => {
    try {
        // Generate a random name for the client (you can implement a more sophisticated method)
        const {clientId} = await req.body;
        const client_id = parseInt(clientId.clientId)
        console.log("in back from appoint.. ", client_id)
        // Insert the randomly generated client into the clients table
        const sql = `INSERT INTO appointments (client_id)
                     VALUES ('${client_id}')`;

        db.query(sql, [clientId], (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({error: "Failed"});
                return;
            } else {

                const appointmentsId = result.insertId;

                console.log("appointmentId backend: ", appointmentsId);

                // Handle the result (e.g., send a success message)
                res.status(200).json({message: 'Appointments created successfully', appointmentsId});
            }
        });
    } catch (error) {
        console.error('Error creating appointmentsId:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});
// Your other routes and middleware here...

module.exports = router;
