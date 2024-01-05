const express = require('express');
const router = express.Router();
const db = require('../modules/database');

router.get('/', async (req, res) => {
    const currentLocale = res.locals.currentLocale;

    const [about_services, services] = await Promise.all([
        db('SELECT * FROM about_services'),
        db(`SELECT category_id, ${currentLocale} AS name, price, is_additional_material, is_price_range FROM service`)
    ]);

    res.render('index', {
        about_services,
        services,
        currentLocale
    });
});

router.get('/curLoc', async (req, res) => {

    const currentLocale = res.locals.currentLocale;
    res.json({ currentLocale });
});
router.get('/category', async (req, res) => {
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

router.get('/services', async (req, res) => {

    // const local = req.query.lang || 'et';
    const currentLocale = res.locals.currentLocale;

    try {
        const rows = await db(`SELECT service_id, ${currentLocale} AS name, duration_minutes, price, is_additional_material, is_price_range FROM service`);
        const services = rows.map(row => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price,
            is_price_range: row.is_price_range,
            is_additional_material: row.is_additional_material
        }));
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

router.get('/services/:categoryId', async (req, res) => {

    const currentLocale = res.locals.currentLocale || 'et';

    try {
        const categoryId = req.params.categoryId;
        const sql = `SELECT service_id, ${currentLocale} AS name, duration_minutes, price, is_additional_material, is_price_range FROM service WHERE category_id = ?`;
        //const sql = `SELECT * FROM service WHERE category_id = ?`;
        const rows = await db(sql, [categoryId]);

        const services = rows.map(row => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price,
            is_price_range: row.is_price_range,
            is_additional_material: row.is_additional_material
        }));
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

router.post('/workers', async (req, res) => {
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

router.post('/clients', async (req, res) => {
    try {
        const { clientName, clientTel, clientEmail } = req.body;
        const sql = 'INSERT INTO clients (clientName, clientTel, clientEmail) VALUES (?, ?, ?)';
        const params = [clientName, clientTel, clientEmail];
        const result = await db(sql, params);

        res.json({ clientId: result.insertId });
    } catch (err) {
        console.error('dbClient',err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

// post client id into appointments table
router.post('/order', async (req, res) => {
    try {
        const { clientId, totalPrice } = req.body;
        console.log('totalPrice in order', totalPrice);
        const sql = 'INSERT INTO `order` (client_id, total_price, createdAt) VALUES (?, ?, NOW())';

        const params = [clientId, totalPrice];
        const result = await db(sql, params);

        res.json({ orderId: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

router.post('/order_services', async (req, res) => {
    try {
        const { orderId, selectedServices } = req.body;
        let serviceIds = [];
        const orderIdInt = parseInt(orderId.orderId); // Convert orderId to an integer

        // Check if _value is defined and is an array
        if (selectedServices && Array.isArray(selectedServices._value)) {
            for (let service of selectedServices._value) {
                serviceIds.push(service.service_id);
            }
        } else {
            console.error('_value is not an array or is undefined');
        }


        const sql = 'INSERT INTO order_services (order_id, service_id) VALUES ?';
        const params = serviceIds.map(serviceId => [orderIdInt, serviceId]);
        await db(sql, [params]);


        res.json({ message: 'success' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }

});


module.exports = router;
