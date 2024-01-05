// adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../modules/database');
const basicAuth = require('basic-auth');


const adminCredentials = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
};

router.use((req, res, next) => {
    const user = basicAuth(req);

    if (!user || !adminCredentials.username || user.name !== adminCredentials.username || user.pass !== adminCredentials.password) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
    next();
});

router.get('/', async (req, res) => {
    try {
        const orders = await db(`
            SELECT o.order_id, o.total_price, o.createdAt, c.clientName, c.clientTel, c.clientEmail, s.name as serviceName
            FROM \`order\` o
                     JOIN clients c ON o.client_id = c.client_id
                     LEFT JOIN order_services os ON o.order_id = os.order_id
                     LEFT JOIN service s ON os.service_id = s.service_id
            ORDER BY o.createdAt DESC;
        `);

        res.render('admin/dashboard', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
