import React from 'react';

export const BwmResError = props => {

    const { errors } = props;

    return (
        
        errors.length > 0 && 
        
        <div className='alert alert-danger bwm-res-errors'>
          {errors.map((err, index) => <p key={index}>{err.detail}</p> )}
        </div>
    )
}