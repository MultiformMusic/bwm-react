import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from './../shared/form/BwmInput';
import { BwmResError } from './../shared/form/BwmResError';
import { minLength4, required } from './../shared/form/validators';

const LoginForm = props => {

  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  
  return (
    <form onSubmit={handleSubmit(submitCb)}>


      <Field
        name="email"
        type="email"
        className="form-control"
        component={BwmInput}
        label="Email"
        validate={[required, minLength4]}
      />

      <Field
        name="password"
        type="password"
        className="form-control"
        component={BwmInput}
        label="Password"
        validate={[required]}
      />

      <button type="submit" className="btn btn-bwm btn-form" disabled={!valid || pristine || submitting}>
        Login
      </button>

      <BwmResError errors={errors} />
    
    </form>
  )
}


export default reduxForm({
  form: 'LoginForm'
})(LoginForm)
