import React from 'react';
import { pretyfiDate, toUppercase } from '../../../helpers/index';
import { Link } from 'react-router-dom';

export const BookingCard = props => {

    const { booking } = props;

    return(
        <div className='col-md-4'>
            <div className='card text-center'>
                <div className='card-header'>
                {booking.rental ? booking.rental.category : 'Deleted rental'}
                </div>
                <div className='card-block'>
                {
                    booking.rental && 
                    <div>
                        <h4 className='card-title'> {booking.rental.title} - {toUppercase(booking.rental.city)}</h4>
                        <p className='card-text booking-desc'>{booking.rental.description}</p>
                    </div>
                }
                <p className='card-text booking-days'>{pretyfiDate(booking.startAt)} - {pretyfiDate(booking.endAt)} | {booking.days} days</p>
                <p className='card-text booking-price'><span>Price: </span> <span className='booking-price-value'>{booking.totalPrice} $</span></p>
                
                {
                    booking.rental && 
                    <div>
                        <Link className='btn btn-bwm' to={`/rentals/${booking.rental.id}`}>Go to Rental</Link>
                    </div>
                }
            
                </div>
                <div className='card-footer text-muted'>
                Created {pretyfiDate(booking.createdAt)}
                </div>
            </div>
        </div>
    )

}