import React from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';
import * as actions from 'actions';

class RentalListing extends React.Component {


    componentWillMount() {
        this.props.dispatch(actions.fetchRentals());
    }

    addRental = () => {
        const rentals = this.state.rentals;
        rentals.push(1);
        this.setState({ rentals });
    }

    render() {

        return(

            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <RentalList rentals={this.props.rentals} />
                <button onClick={this.addRental} >Add Rental</button>
            </section>
            
        );
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals.data
    }
}

export default connect(mapStateToProps)(RentalListing);