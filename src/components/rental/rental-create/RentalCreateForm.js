import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from './../../shared/form/BwmInput';
import { BwmResError } from './../../shared/form/BwmResError';
//import { minLength4, required } from './../shared/form/validators';
import { BwmTextArea } from './../../shared/form/BwmTextArea';
import { BwmSelect } from './../../shared/form/BwmSelect';
import { BwmFileUpload } from './../../shared/form/BwmFileUpload';

const RentalCreateForm = props => {

  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  
  return (

    <form onSubmit={handleSubmit(submitCb)}>

      <Field
        name="title"
        type="text"
        className="form-control"
        component={BwmInput}
        label="Title"
      />
     <Field
        name="description"
        type="text"
        className="form-control"
        component={BwmTextArea}
        rows="2"
        label="Description"
      />
      <Field
        name="city"
        type="text"
        className="form-control"
        component={BwmInput}
        label="City"
      />
      <Field
        name="street"
        type="text"
        className="form-control"
        component={BwmInput}
        label="Street"
      />
      <Field
        name="category"
        className="form-control"
        component={BwmSelect}
        options={options}
        label="Category"
      />
      <Field
        name="image"
        className="form-control"
        component={BwmFileUpload}
        label="Image"
      />
      <Field
        name="bedrooms"
        type="number"
        className="form-control"
        component={BwmInput}
        label="Bedrooms"
      />

      <Field
        name="dailyRate"
        type="text"
        className="form-control"
        component={BwmInput}
        symbol="$"
        label="Daily Rate"
      />
      <Field
        name="shared"
        type="checkbox"
        className="form-control"
        component={BwmInput}
        label="Shared"
      />

      <button type="submit" className="btn btn-bwm btn-form" disabled={!valid || pristine || submitting}>
        Create Rental
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}


export default reduxForm({
  form: 'RentalCreateForm',
  initialValues: {shared: false, category: 'apartment'}
})(RentalCreateForm)
