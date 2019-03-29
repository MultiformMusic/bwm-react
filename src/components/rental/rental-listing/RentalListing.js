import React from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';
import * as actions from 'actions';

/*function withAlert(WrappedComponent) {

    return class extends React.Component {

        alertUser() {
            alert('Wake up !!');
        }

        render() {
            return <WrappedComponent {...this.props} alertUser={this.alertUser} />
        }
    }
}

function withDanger(WrappedComponent) {

    return class extends React.Component {

        danger() {
            alert('Danger');
        }

        render() {

            return <WrappedComponent {...this.props} danger={this.danger} />
        }
    }

}*/

/*class AlertRentalListing extends React.Component {

    alertUser() {
        alert('alert user');
    }

    render() {
        return(
            <RentalListing {...this.props} alertUser={this.alertUser} />
        )
    }
}*/

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