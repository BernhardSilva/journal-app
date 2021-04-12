import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';
import { toastError } from '../helpers/messages';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        toastError.fire({
          title: `${e.message}`,
        });
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startSignInWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        toastError.fire({
          title: `${e.message}`,
        });
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user: { displayName, uid } }) => {
        dispatch(login(uid, displayName));
      });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
