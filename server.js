require('dotenv').config();
const Express = require('express');
const { connectToDb } = require('./mongodb/connection');

const PORT = process.env.PORT || 8080;

const app = Express();

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