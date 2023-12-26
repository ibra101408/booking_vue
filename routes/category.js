const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.get('/', async (req, res) => {
    try {
        const sql = 'SELECT category_id, name FROM category LIMIT 3';
        const rows = await db(sql);

        const category = rows.map(row => ({
            category_id: row.category_id,
            name: row.name
        }));

        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Failed'});
    }
});


module.exports = router;
