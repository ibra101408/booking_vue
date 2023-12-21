const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.get('/', async (req, res) => {

    try {
        //get locales
        const local = req.query.lang || 'et';
        const about_services = await db('SELECT * FROM about_services');

        res.render('index', {about_services, local});

    } catch (e) {
        console.log(e);
        res.render('error', {error: e.message});
    }
});

module.exports = router;