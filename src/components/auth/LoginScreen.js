import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { setErrorAction, removeErrorAction } from '../../actions/ui';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const { msgError, loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // console.log(email, password);
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setErrorAction('Email must be valid!'));
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
    <div className="animate__animated animate__fadeIn animate__fast">
      <h3 className="auth__tittle">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input mt-5"
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
          autoComplete="on"
          value={password}
          onChange={handleInputChange}
        />

        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
          onClick={removeError}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link" onClick={removeError}>
          Create new account
        </Link>
      </form>
    </div>
  );
};
