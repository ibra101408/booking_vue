const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require('dotenv').config({});

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.yaml');

// I18n
const {I18n} = require('i18n');
const i18n =  new I18n({
    locales: ['et', 'ru'],
    directory: __dirname + '/locales',
    defaultLocale: 'et',
})

// Init middleware
app.use(i18n.init);
app.use(express.static('public'));
app.use(express.json());
app.use(expressLayouts);

// Set translations
app.use((req, res, next) => {
    const locale = req.query.lang || 'et';
    res.locals.translations = require(`./locales/${locale}.json`)
    next();
});

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('layout', 'layouts/public');

// Routes
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/appointments', require('./routes/appointments'));
app.use('/booking', require('./routes/booking'));
app.use('/category', require('./routes/category'));
app.use('/clients', require('./routes/clients'));
app.use('/google', require('./routes/google'));
app.use('/service', require('./routes/service'));
app.use('/worker', require('./routes/worker'));
app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${(process.env.PORT || 3000)}`);
});
