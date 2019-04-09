import React from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';
import * as actions from 'actions';
import { toUppercase } from 'helpers';


class RentalSearchListing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedCity: ''
        }

    }

    componentWillMount() {

        this.searchRentalByCity();
    }

    componentDidUpdate(prevProps) {

        const currentUrlPamar = this.props.match.params.city;
        const prevUrlParam  = prevProps.match.params.city;

        if (currentUrlPamar !== prevUrlParam) {
            this.searchRentalByCity();
        }

    }

    searchRentalByCity = () => {

        const searchedCity = this.props.match.params.city;
        this.setState({searchedCity});

        this.props.dispatch(actions.fetchRentals(searchedCity)); 
    }

    renderTitle = () => {

        const { errors, data } = this.props.rentals;
        const { searchedCity } = this.state;
        let title = '';

        if (errors.length > 0 ) {
            title = errors[0].detail;
        } 
        
        if (data.length > 0) {
            title = 'Your home in the city of ' + toUppercase(searchedCity);
        }

        return <h1 className='page-title'>{title}</h1>
    }

    addRental = () => {
        const rentals = this.state.rentals;
        rentals.push(1);
        this.setState({ rentals });
    }

    render() {

        return(

            <section id='rentalListing'>
                {this.renderTitle()}
                <RentalList rentals={this.props.rentals.data} />
            </section>
            
        );
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals
    }
}

export default connect(mapStateToProps)(RentalSearchListing);