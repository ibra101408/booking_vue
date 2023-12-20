const express = require('express');
const path = require("path");
const router = express.Router();
const fs = require('fs');
const db = require('../doc/database');

router.get('/', async (req, res) => {


    const sql = 'SELECT * FROM service';

    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const service = rows.map(row => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price
        }));

        res.json(service);

    });
});

router.get('/:categoryId', async (req, res) => {

    const categoryId = req.params.categoryId; // get from params
    const sql = 'SELECT * FROM service WHERE category_id = ?';

    db.query(sql, [categoryId], (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: 'Failed' });
        }

        const services = rows.map((row) => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price,
        }));

        res.json(services);
    });
});


module.exports = router;
