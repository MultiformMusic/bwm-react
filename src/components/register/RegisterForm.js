import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from './../shared/form/BwmInput';
import { BwmResError } from './../shared/form/BwmResError';

const RegisterForm = props => {

  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <Field
        name="username"
        type="text"
        className="form-control"
        component={BwmInput}
        label="User Name"
      />

      <Field
        name="email"
        type="email"
        className="form-control"
        component={BwmInput}
        label="Email"
      />

      <Field
        name="password"
        type="password"
        className="form-control"
        component={BwmInput}
        label="Password"
      />

      <Field
        name="passwordConfirmation"
        type="password"
        className="form-control"
        component={BwmInput}
        label="Confirm Password"
      />

      <button type="submit" className="btn btn-bwm btn-form" disabled={!valid || pristine || submitting}>
        Register
      </button>

      <BwmResError errors={errors} />
    
    </form>
  )
}

const validate = values => {
  const errors = {}
  
  if (values.username && values.username.length < 4) {
    errors.username = 'User name min length is 4 characters';
  }

  if (!values.email) {
    errors.email = 'Enter an email';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Enter password confirmation';
  }

  if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'Password not match';
  }
  
  /*if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }*/

  return errors
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)
