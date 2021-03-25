import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, 'Juan'));
    }, 3500);
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user: { displayName, uid } }) => {
        // console.log(displayName, uid);
        dispatch(login(uid, displayName));
      });
  };
};
