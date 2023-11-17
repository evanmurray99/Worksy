const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// define routes and API
app.use(express.json({ extended: false }));
app.use('/api/users' , require ("./Routes/UserApi"))
app.use('/api/services' , require ("./Routes/ServiceApi"))
app.use('/api/categories' , require ("./Routes/CategoryApi"))
app.use('/api/reviews' , require ("./Routes/ReviewApi"))
app.use('/api/chats' , require ("./Routes/ChatApi"))

app.get("/", (req, res) => {
    res.send("App up");
});
module.exports = app;