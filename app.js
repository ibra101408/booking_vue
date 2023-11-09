const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.yaml');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// API Documentation
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes for the API
app.use('/api/workers', require('./api/workers'));
//app.use('/api/orders', require('./api/orders'));

// Routes for the front-end
app.use('/workers', require('./routes/workers'));
//app.use('/orders', require('./routes/orders'));
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
