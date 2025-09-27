require('dotenv').config();
const Express = require('express');
const expressLayouts = require('express-ejs-layouts')
const { connectToDb } = require('./mongodb/connection');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');

// Importing routes
const mainRoute = require('./route/mainRoute');
const getImageRoute = require('./route/getImage');
const getUserRoute = require('./route/getUser');
const updateRoute = require('./route/updateContent');
const deleteRoute = require('./route/deleteContent');
const loginRoute = require('./route/loginRoute');

const PORT = process.env.PORT || 8080;

const app = Express();

// Setting up session middleware
app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 48, // 2 days
        secure: false, // Set to true if using HTTPS or false for HTTP
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        name: 'session', // Custom name for the session cookie
    }
}));

app.use(cors());

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Setting up EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout');

// api-docs route
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Using routes
app.use('/getImages', getImageRoute);
app.use('/getUsers', getUserRoute);
app.use('/updateContent', updateRoute);
app.use('/deleteContent', deleteRoute);
app.use('/login', loginRoute);

// Default route
app.use('/', mainRoute);

/*
    * Connect to MongoDB and start the server
*/
connectToDb((error) => {
    if (!error) {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is running on PORT: ${PORT}`)
        });
    } else {
        console.error('Failed to connect to MongoDB', error);
    }
});