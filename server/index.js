const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const path = require('path');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(
    () => {
        
        if(process.env.NODE_ENV !== 'production') {
            const fakeDb = new FakeDb();
            //fakeDb.seekDb();
        }

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
app.use('/api/v1/bookings', bookingRoutes);


if (process.env.NODE_ENV === 'production') {

    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));
    
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });

}


app.listen(port, function() {
    console.log("Running server");
});