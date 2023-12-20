const express = require('express');
const path = require("path");
const router = express.Router();
const db = require('../doc/database');


router.post('/', async (req, res) => {
    try {
        const { selectedServices } = req.body;
        console.log("selectedServices--: ", selectedServices);


        const values = selectedServices.map(serviceId => `(${serviceId})`).join(',');
        const sql = `INSERT INTO appointment_services (service_id) VALUES ${values}`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({ error: "Failed" });
                return;
            }

            console.log("result: ", result);

            // Handle the result (e.g., send a success message)
            res.status(200).json({ message: 'Booking successful', result: result });
        });
    } catch (error) {
        console.error('Error handling booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;