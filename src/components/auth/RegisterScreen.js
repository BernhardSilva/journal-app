import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setErrorAction, removeErrorAction } from '../../actions/ui';
import { startSignInWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // console.log(state);
  const { msgError } = useSelector((state) => state.ui); // <- Acá extraigo de state->ui->{el mensaje de error del storage}

  const [formValues, handleInputChange] = useForm({
    name: 'Benja',
    email: 'benja@gmail.com',
    password: '123456',
    password2: '123456',
    // name: '',
    // email: '',
    // password: '',
    // password2: '',
  });

  const { name, email, password, password2 } = formValues;

  //Form Handler
  const handleSignUpForm = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startSignInWithEmailPasswordName(email, password, name));
    }
  };

  //Form validation
  const isFormValid = () => {
    if (name.trim().length <= 1) {
      dispatch(
        setErrorAction('The name is required and must be longer than 1!'),
      );
      return false;
    } else if (validator.isInt(name)) {
      dispatch(setErrorAction('Name must be valid!'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setErrorAction('Email must be valid!'));
      return false;
    } else if (password !== password2) {
      dispatch(setErrorAction('Passwords must match!'));
      return false;
    } else if (password.length <= 5) {
      dispatch(
        setErrorAction('The Password needs to be longer than 6 characters!'),
      );
      return false;
    }
    dispatch(removeErrorAction());
    return true;
  };

  //Remove Error
  const removeError = () => {
    dispatch(removeErrorAction());
    return true;
  };

  return (
    <>
      <h3 className="auth__tittle">Sign Up</h3>
      <form onSubmit={handleSignUpForm}>
        <input
          className="auth__input mt-5"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Sign Up
        </button>

        <Link to="/auth/login" className="link" onClick={removeError}>
          Already registered?
        </Link>
      </form>
    </>
  );
};
