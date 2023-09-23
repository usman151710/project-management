const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/user');

const app = express();

app.listen(process.env.PORT);

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.DB_URI)
    .then((result) => { })
    .catch((err) => { })

app.get('/', (req, res) => {
    res.json({ msg: "Welecome to the app" })
})