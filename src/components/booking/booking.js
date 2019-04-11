import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { getRangeOfDates } from './../../helpers/index';
import * as moment from 'moment';
import { BookingModal } from './BookingModal';
import * as actions from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Booking extends React.Component {

    constructor(props) {
        super(props);

        this.bookedOutDates = [];

        this.dateRef = React.createRef();

        this.state = {
            proposedBooking: {
                startAt: '',
                endAt: '',
                guests: '',
                rental: {}
            },
            modal: {
                open: false
            },
            errors: []
        }
    }

    componentWillMount() {
        this.getBookedOutDates();
    }

    getBookedOutDates() {
        const {bookings} = this.props.rental;

        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
                this.bookedOutDates.push(...dateRange);
            });
        }
        console.log(this.bookedOutDates);

    }

    checkInvalidDate = (date) => {
        return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply = (event, picker) => {

        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');
        
        this.dateRef.current.value = startAt + ' to ' + endAt;

        this.setState({
            proposedBooking: {
                    ...this.state.proposedBooking,
                    startAt,
                    endAt
            }
        });

    }

    selectGuests = (event) => {

        console.log(parseInt(event.target.value));
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value, 10)
            }
        });

    }

    confirmProposedData = () => {

        const {startAt, endAt} = this.state.proposedBooking;
        const days = getRangeOfDates(startAt, endAt).length - 1;
        const { rental } = this.props;

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                days,
                totalPrice: days * rental.dailyRate,
                rental
            },
            modal: {
                open: true
            }
        });
    }

    cancelConfirmation = () => {
        this.setState({
            modal: {
                open: false
            }
        });
    }

    reserveRental = () => {

        actions.createBooking(this.state.proposedBooking)
               .then(
                   (booking) => {
                    this.addNewBookedDate(booking);
                    this.cancelConfirmation();
                    this.resetData();
                    toast.success("Booking has been sucessfully created !");
                   },
                   (errors) => {
                    
                    this.setState({errors});
                   }
               )

    }

    addNewBookedDate = (booking) => {

        const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
    }

    resetData = () => {
        this.dateRef.current.value = '';
        this.setState({proposedBooking: {
            guests: '',
            rental: {}
        }});
    }

    render() {

        const { rental, auth: { isAuth } } = this.props;
        const {startAt, endAt, guests} = this.state.proposedBooking;

        return (
        <div className='booking'>
            <ToastContainer />
            <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
            
            <hr></hr>
            {
                !isAuth && 
                <React.Fragment>
                    <Link to='/login' className='btn btn-bwm btn-confirm btn-block'>
                        Loggin to book place
                    </Link>
                </React.Fragment>
            }
            {
                isAuth && 
                <React.Fragment>
                    <div className='form-group'>
                    <label htmlFor='dates'>Dates</label>
                        <DateRangePicker onApply={this.handleApply} 
                                        isInvalidDate={this.checkInvalidDate} 
                                        opens='left' 
                                        containerStyles={{display: 'block'}} >

                            <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>

                        </DateRangePicker>
                    </div>
                    <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input onChange={this.selectGuests} type='number' value={this.state.proposedBooking.guests} className='form-control' 
                        id='guests' placeholder=''></input>
                    </div>
                    <button disabled={!startAt || !endAt || !guests} onClick={this.confirmProposedData} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                </React.Fragment>
            }
            <hr></hr>

            <p className='booking-note-title'>People are interested into this house</p>
            <p className='booking-note-text'>
            More than 500 people checked this rental in last month.
            </p>
            <BookingModal booking={this.state.proposedBooking}
                          confirmModal={this.reserveRental}
                          open={this.state.modal.open} 
                          errors={this.state.errors}
                          closeModal={this.cancelConfirmation} />
        </div>
        )
    }
}

function mapStateToProps (state) {
    return {
       auth: state.auth 
    }
}

export default connect(mapStateToProps)(Booking);