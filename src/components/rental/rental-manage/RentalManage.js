
import React from 'react';
import { getUserRentals } from '../../../actions';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { deleteRental } from './../../../actions/index';


export class RentalManage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userRentals: [],
            errors: [],
            isFetching: false,
        }
    }

    renderRentalCards(rentals) {

        return rentals.map((rental, index) => {
           
            return <RentalManageCard 
                        modal={<RentalManageModal 
                        bookings={rental.bookings}/>} key={index} rental={rental} 
                        rentalIndex={index} 
                        deleteRentalCb={this.deleteRental} />
        });
    }


    deleteRental = (rentalId, rentalIndex) => {

        deleteRental(rentalId).then(
            () => {
                this.deleteRentalFromList(rentalIndex);
            },
            (errors) => {

                toast.error('Cannot delete rental with active bookings');
            }
        )
    }

    deleteRentalFromList = (rentalIndex) => {

        const userRentals = this.state.userRentals.slice();
        userRentals.splice(rentalIndex, 1);
        
        this.setState({userRentals});
    }

    componentWillMount() {

        this.setState({isFetching: true});

        getUserRentals().then(
            userRentals => this.setState({userRentals, isFetching: false}),
            errors => this.setState({errors, isFetching: false})
        );
    }

    render() {

        const { userRentals, isFetching } = this.state;

        return(
            
            <section id='userRentals'>
                <ToastContainer />
                <h1 className='page-title'>My Rentals</h1>
                <div className='row'>

                    {this.renderRentalCards(userRentals)}

                </div>
                {
                    !isFetching && userRentals.length === 0 &&

                    <div className='alert alert-warning'>
                        You dont have any rentals currenty created. If you want advertised your property
                        please follow this link.
                        <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
                    </div>
                }
            </section>
            
        );
    }
}