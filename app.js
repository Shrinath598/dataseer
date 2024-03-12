const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileRouter = require('./routes/FileRoutes');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerSpec = require('./config/swaggerConfig');
dotenv.config();


app.listen(process.env.PORT, () => console.log("Successful. Please go to http://localhost:9200/api-docs/ on your browser"))




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', fileRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.swaggerSpec()));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
