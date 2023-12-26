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

router.get('/services', async (req, res) => {
    try {
        const rows = await db('SELECT * FROM service');
        const services = rows.map(row => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price
        }));
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

router.get('/services/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const sql = 'SELECT * FROM service WHERE category_id = ?';
        const rows = await db(sql, [categoryId]);

        const services = rows.map(row => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price,
        }));

        res.json(services);
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
        //console.log('client in back',result);
        res.json({ clientId: result.insertId });
    } catch (err) {
        console.error('dbClient',err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

// post client id into appointments table
router.post('/appointments', async (req, res) => {
    try {
        const { clientId } = req.body;
        const sql = 'INSERT INTO appointments (client_id) VALUES (?)';

        const params = [clientId];
        const result = await db(sql, params);

        res.json({ appointmentId: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }
});

//send selected services ids to appointment_services table where appointment_services.appointment_id = appointments.appointment_id
router.post('/appointment_services', async (req, res) => {
    try {
        const { appointment_id, selectedServices } = req.body;
        let serviceIds = [];

        // Check if _value is defined and is an array
        if (selectedServices && Array.isArray(selectedServices._value)) {
            for (let service of selectedServices._value) {
                serviceIds.push(service.service_id);
                console.log('serviceIDS ', serviceIds);
            }
        } else {
            console.error('_value is not an array or is undefined');
        }

        console.log('appointmentId BACK ', appointment_id);
        const sql = 'INSERT INTO appointment_services (appointment_id, service_id) VALUES ?';
        const params = serviceIds.map(serviceId => [appointment_id, serviceId]);
        const result = await db(sql, [params]);
        console.log('result', result);
        res.json({ message: 'success' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed' });
    }

});


module.exports = router;
