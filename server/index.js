const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');


mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(
    () => {
        const fakeDb = new FakeDb();
        fakeDb.seekDb();
    },
    (err) => {
        console.log(err);
    }
);

const port = process.env.PORT || 3001;
const app = express();
app.use('/api/v1/rentals', rentalRoutes);

app.listen(port, function() {
    console.log("Running server");
});