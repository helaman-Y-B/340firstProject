require('dotenv').config();
const Express = require('express');

const PORT = process.env.PORT || 8080;

const app = Express();

app.use("/", (req, res) => {
    res.send("Project week 3")
})

app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`)
});