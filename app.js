const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require('dotenv').config({});
require('./modules/i18n')(app);
require('./routes/cron').scheduleCronJob();


// Init middleware

app.use(express.static('public'));
app.use(express.json());
app.use(expressLayouts);

// Set translations

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
