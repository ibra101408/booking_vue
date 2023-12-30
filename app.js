const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require('dotenv').config({});

// I18n
const {I18n} = require('i18n');
const i18n = new I18n({
    locales: ['et', 'ru'], directory: __dirname + '/locales', defaultLocale: 'et',
});
require('./routes/sendberry').scheduleCronJob();


// Init middleware
app.use(i18n.init);
app.use(express.static('public'));
app.use(express.json());
app.use(expressLayouts);

// Set translations
app.use((req, res, next) => {
    const locales = ['et', 'ru'];
    const currentLocale = req.query.lang || 'et';
    res.locals.locales = locales;
    res.locals.currentLocale = currentLocale;
    res.locals.translations = require(`./locales/${currentLocale}.json`);
    next();
});

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('layout', 'layouts/public');

// Routes
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/services'));
app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${(process.env.PORT || 3000)}`);
});
