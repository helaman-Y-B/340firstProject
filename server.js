require('dotenv').config();
const Express = require('express');
const { connectToDb } = require('./mongodb/connection');

const getImageRoute = require('./route/getImage');
const getUserRoute = require('./route/getUser');
const getImagesRoute = require('./route/getImages');
const getUsersRoute = require('./route/getUsers');

const PORT = process.env.PORT || 8080;

const app = Express();

app.use("/getImage", getImageRoute);
app.use("/getImages", getImagesRoute);

app.use("/getUser", getUserRoute);
app.use("/getUsers", getUsersRoute);

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