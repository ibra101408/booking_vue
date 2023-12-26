const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.post('/', async (req, res) => {
    try {
        const selectedServices = req.body;

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

        const rows = await db(sql, selectedServices);
        const workers = rows.map(row => ({
            worker_id: row.worker_id,
            name: row.name,
        }));

        res.json(workers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }
});


module.exports = router;
