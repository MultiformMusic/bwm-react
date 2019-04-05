const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({'secret': true});
});

router.get('', function(req, res) {

    Rental.find({})
          .select('-bookings')
          .exec(function(err, foundRentals) {
            return res.json(foundRentals);
        });
          
});

router.get('/:id', function(req, res) {

    const rentalId = req.params.id;
    console.log(rentalId)

    Rental.findById(rentalId)
          .populate('user', 'username')
          .populate('bookings', 'startAt endAt')
          .exec(function(err, foundRental) {

            if (err) {
                console.log(err)
                return res.status(422).send({errors: [{title: 'Rental Error', detail: 'Could not find rental'}]});
            }
    
            return res.json(foundRental);
        });
    
});

module.exports = router;