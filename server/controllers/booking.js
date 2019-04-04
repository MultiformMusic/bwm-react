
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const moment = require('moment');

exports.createBooking = function(req, res) {

    const { startAt, endAt, totalPrice, guests, days, rental} = req.body;

    const user = res.locals.user;

    const booking = new Booking({startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id, )
          .populate('bookings')
          .populate('user')
          .exec(function(err, foundRental) {


                if (err) {
                    return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
                }

                if (foundRental.user.id === user.id) {
                    return res.status(422).send({errors: [{title: 'Invalid user', detail: 'Cannot create booking on your rental'}]});
                }

                if (isValidBooking(booking, foundRental)) {
                    
                    booking.user = user;
                    booking.rental = foundRental;
                    foundRental.bookings.push(booking.id);
                    
                    booking.save(function(err) {
                        if (err) {
                            return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
                        }

                        foundRental.save();
                        console.log('user.id1 = ', user.id)
                        console.log('booking.id = ', booking.id)

                        user.bookings.push(booking.id);
                        user.save();
                        /*User.update({_id: user.id, $push: {bookings:{ $each: booking.id }} }, {}, function(err, doc) {
                            console.log(err)
                        });*/

                        return res.json({'startAt': booking.startAt, 'endAt': booking.endAt});
                    });
                    


                } else {
                    return res.status(422).send({errors: [{title: 'Invalid booking', detail: 'Choosen date are already taken'}]});
                }


          });
}

function isValidBooking(proposedBooking, rental) {

    let isvalid = true;

    if (rental.bookings && rental.bookings.length > 0) {

        isvalid = rental.bookings.every(function(booking) {
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);
            
            const actualStart = moment(booking.startAt);
            const actualdEnd = moment(booking.endAt);

            return ((actualStart < proposedStart && actualdEnd < proposedStart) || 
                (proposedEnd < actualdEnd && proposedEnd < actualStart)
            );
        });
    }

    return isvalid;
}