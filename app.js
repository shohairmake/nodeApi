const app = require('express')();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookiePaser = require('cookie-parser');
const expressValidator = require('express-validator');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('mongodb connected'));

mongoose.connection.on('error', error => {
    console.log(`mongodb connection error ${error.message}`);
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookiePaser());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!!' });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`node is runing at ${port}`);
});