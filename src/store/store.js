// 3rd
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

// utilizo composeEnhancers porque voy a trabajar con thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Se crea reducers con una función de redux que es combineReducers, esto sirve para
   combinar los reducers, puesto que el store solo acepta 1 reducer */
//En otros proyectos lo tienen generalmente como RouteReducer
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

//acá le paso los reducers combinados a mi store
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
