const express = require('express');
const path = require("path");
const router = express.Router();
const db = require('../doc/database');

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
// Handle the POST request to the /selected-category endpoint
router.post('/', (req, res) => {
    const selectedCategoryId = req.body.id;
    const selectedCategoryName = req.body.name;

    // You can perform additional actions with the selected data here

    // Send a response back to the client
    res.json({ message: 'Selected category data received successfully' });
});

module.exports = router;