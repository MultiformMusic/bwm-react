import React from 'react';
import { RentalCard } from './RentalCard';

export default class RentalList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rentals: [1,2,3,4]
        }
    }

    renderRentals() {
        return this.state.rentals.map(rental => {
            return(
                <RentalCard/>
            );
        });
    }

    render() {

        return(

            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <div className='row'>
                    {this.renderRentals()}
                </div>
            </section>
            
        );
    }
}