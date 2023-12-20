const express = require('express');
const path = require("path");
const router = express.Router();
const db = require('../doc/database');
const fs = require("fs");

/*
const servicesData = JSON.parse(fs.readFileSync('/Users/daniilvodenejev/webstormProjects/booking_vue/public/services.json', 'utf-8'));
const pricesData = JSON.parse(fs.readFileSync('/Users/daniilvodenejev/webstormProjects/booking_vue/public/prices.json', 'utf-8'));
 servicesData, pricesData,
*/

router.get('/', (req, res) => {
    const locale = req.query.lang || 'et';
    const translations = require(`../locales/${locale}.json`);

    res.render('index', { title: 'My Express App', translations });
   // console.log("index.js");

});


module.exports = router;
