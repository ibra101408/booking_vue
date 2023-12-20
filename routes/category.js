const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.get('/', async (req, res) => {
    const sql = 'SELECT * FROM category';

    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const category = rows.map(row => ({
            category_id: row.category_id,
            name: row.name
        }));

        res.json(category);
    });
});


module.exports = router;
