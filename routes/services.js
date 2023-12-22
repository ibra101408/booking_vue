const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.get('/', async (req, res) => {
    const local = req.query.lang || 'et';
    const currentLocale = res.locals.currentLocale;
    const [about_services, services] = await Promise.all([
        db('SELECT * FROM about_services'),
        db(`SELECT category_id, ${currentLocale} AS name, price, is_additional_material, is_price_range FROM service`)
    ]);

    res.render('index', {
        about_services,
        services,
        local
    });

});
module.exports = router;
