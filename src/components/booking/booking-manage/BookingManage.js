
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserBookings } from '../../../actions';
import { BookingCard } from './BookingCard';

class BookingManage extends React.Component {

    componentWillMount() {

        this.props.dispatch(fetchUserBookings());
    }

    renderBookings = () => {
        const { userBookings } = this.props;

        return userBookings.map((booking, index) => {
            console.log('booking = ', booking);
            return(
                <BookingCard key={index} booking={booking} />
            ) 
        });
    }

    render() {

        const { userBookings, isFetching } = this.props;
        console.log('render = ', this.props);

        return(

            <section id='userBookings'>
                <h1 className='page-title'>My Bookings</h1>
                <div className='row'>

                    {this.renderBookings()}

                </div>
                {
                   !isFetching && userBookings.length === 0 &&

                    <div className='alert alert-warning'>
                        You have no bookings created go to rentals section and book your place today.
                        <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals'>Available Rental</Link>
                    </div>
                }
            </section>
            
        );
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps state = ', state);
    return {
        userBookings: state.userBookings.data,
        isFetching: state.userBookings.isFetching
    }
}

export default connect(mapStateToProps)(BookingManage);