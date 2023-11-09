// api/workers.js??

const express = require('express');
const router = express.Router();
const workersData = require('../workersData');

router.post('/check-services', (req, res) => {
    console.log("1")
    const requestedServices = req.body.services; // Assuming services are in the request body
    const availableWorkers = workersData.filter((worker) => {
        return requestedServices.every((service) => worker.capabilities.includes(service));
    });
    res.json(availableWorkers);
    res.send("2");
});

module.exports = router;
