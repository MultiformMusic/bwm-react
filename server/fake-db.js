
const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const datas = require('./data.json');

class FakeDb {

    constructor() {

        this.rentals = datas.rentals;

        this.users = datas.users;
    }

    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDataToDb() {

        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental.id);
            newRental.save();
        });

        user.save();
        user2.save();
    }

    async seekDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;