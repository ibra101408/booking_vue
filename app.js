const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.yaml');
const app = express();
const {I18n} = require('i18n');

const i18n =  new I18n({
    locales: ['et', 'ru'],
    directory: __dirname + '/locales',
    defaultLocale: 'et',
})

app.use(i18n.init);

app.use(bodyParser.json());
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// API Documentation
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/appointments', require('./routes/appointments'));
app.use('/client', require('./routes/client'));
app.use('/booking', require('./routes/booking'));
app.use('/google', require('./routes/google'));
app.use('/category', require('./routes/category'));
app.use('/service', require('./routes/service'));
app.use('/worker', require('./routes/worker'));
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

//qqq247687@gmail.com


// second's worker calendar
/*
Calendar ID
1a1954afb95b03befaf29fd7a7e76349eb4345e6ca6bf2c26fc6224afb158fff@group.calendar.google.com
Public URL to this calendar
https://calendar.google.com/calendar/embed?src=1a1954afb95b03befaf29fd7a7e76349eb4345e6ca6bf2c26fc6224afb158fff%40group.calendar.google.com&ctz=Europe%2FTallinn



*/
/*
*
*
<%- include ('welcome.ejs') %>
<%- include ('services.ejs') %>
<%- include ('ownStyle.ejs') %>
<%- include ('prices.ejs') %>
<%- include ('gallery.ejs') %>
<%- include ('workingHours.ejs') %>
<%- include ('footer.ejs') %>
* */