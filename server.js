require('dotenv').config();
const Express = require('express');
const { connectToDb } = require('./mongodb/connection');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const getImageRoute = require('./route/getImage');
const getUserRoute = require('./route/getUser');

const PORT = process.env.PORT || 8080;

const app = Express();

app.use(cors());

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// api-docs route
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use("/getImages", getImageRoute);

app.use("/getUsers", getUserRoute);

app.use("/", (req, res) => {
    res.send("Project week 3")
});

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