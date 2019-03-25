import React from 'react';
import { RentalCard } from './RentalCard';

export default class RentalList extends React.Component {

    renderRentals = () => {
        return this.props.rentals.map((rental, index) => {
            return(
                <RentalCard rental={rental} key={index} colNum='col-md-3 col-xs-6' />
            );
        });
    }

    render() {

        return(

                <div className='row'>
                    {this.renderRentals()}
                </div>
           
        );
    }
}