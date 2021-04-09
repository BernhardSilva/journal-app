import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../../firebase/firebase-config';

import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../../actions/auth';
import { LoadingScreen } from '../auth/LoadingScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //acá creo un observable de user, para ver la actividad de login de user.
    firebase.auth().onAuthStateChanged(async (user) => {
      // console.log(user);
      //si user existe? entonces busco por uid
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking]); // 👈 se pone como dependencia en este caso el dispatch para evitar el error del browser

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              path="/auth"
              component={AuthRouter}
              isAuthenticated={isLoggedIn}
            />

            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              path="/"
              component={JournalScreen}
            />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    </>
  );
};
