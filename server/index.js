const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(
    () => {
        const fakeDb = new FakeDb();
        //fakeDb.seekDb();
    },
    (err) => {
        console.log(err);
    }
);

const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, function() {
    console.log("Running server");
});