import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../../firebase/firebase-config';

import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../../actions/auth';
import { LoadingScreen } from '../auth/LoadingScreen';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    //acá creo un observable de user, para ver la actividad de login de user.
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      //si user existe? entonces busco por uid
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
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
            <Route path="/auth" component={AuthRouter} />

            <Route exact path="/" component={JournalScreen} />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    </>
  );
};
