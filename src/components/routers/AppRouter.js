import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
  return (
    <>
      {/* {
                Router:
                path=/auth      
                No es exact
                component={AuthRouter}
                
                MainRoute:
                exact
                path="/"
                component{JournalScreen}
            } */}
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
