const express = require('express');
const path = require("path");
const router = express.Router();
const db = require('../doc/database');

router.get('/', async (req, res) => {

    const sql = 'SELECT * FROM worker';
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const worker = rows.map(row => ({
            worker_id: row.worker_id,
            name: row.name
        }));
        console.log("/workers11 - ", worker);

        res.json(worker);
    });
});

router.post('/', async (req, res) => {
    const selectedServices = req.body.selectedServices;
    console.log('/find-workers - ', selectedServices);
    if (!selectedServices || selectedServices.length === 0) {
        return res.status(400).json({ error: 'No services selected' });
    }

    const placeholders = selectedServices.map(() => '?').join(', ');
    const sql = `
        SELECT DISTINCT w.*
            FROM worker w
                     JOIN worker_services ws ON w.worker_id = ws.worker_id
            WHERE ws.service_id IN (${placeholders})
            GROUP BY w.worker_id
            HAVING COUNT(DISTINCT ws.service_id) = ${selectedServices.length}
    `;

    db.query(sql, selectedServices, (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: 'Failed' });
        }

        const workers = rows.map(row => ({
            worker_id: row.worker_id,
            name: row.name,
        }));

        res.json(workers);
    });
});

module.exports = router;
