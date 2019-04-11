
import React from 'react';
import Modal  from 'react-responsive-modal';
import { pretyfiDate } from '../../../helpers/index';

export class RentalManageModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
         
            open: false
        }
    }

    openModal = () => {
        this.setState({open: true});
    }

    closeModal = () => {
        this.setState({open: false});
    }

    renderBookings = (bookings) => {
        
        console.log('renderBookings = ', bookings)
        return bookings.map((booking, index) => {
            return <React.Fragment key={index}>
                        <p><span>Date:</span> {pretyfiDate(booking.startAt)} - {pretyfiDate(booking.endAt)}</p>
                        <p><span>Guests:</span> {booking.guests}</p>
                        <p><span>Total Price:</span> {booking.totalPrice} $</p>
                        {   
                            index + 1 !== booking.length &&

                            <hr></hr>
                        }
                   </React.Fragment>
        });
    }

    render() {

        const {bookings} = this.props;

        return(

            <React.Fragment>
                <button type='button' onClick={this.openModal} className='btn btn-bwm'>Bookings</button>
                <Modal open={this.state.open} onClose={this.closeModal} little classNames={{ modal: 'rental-booking-modal' }}>
                    <h4 className='modal-title title'>Made Bookings</h4>
                    <div className='modal-body bookings-inner-container'>

                        {this.renderBookings(bookings)}

                    </div>
                    <div className='modal-footer'>
                    <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Cancel</button>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}