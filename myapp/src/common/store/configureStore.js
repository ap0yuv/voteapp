import { createStore, applyMiddleware,combineReducers } from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'


export default function configureStore(initialState) {
  const history = typeof window !== 'undefined' ? createHistory() : createMemoryHistory();
  const middleware = routerMiddleware(history)

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk,middleware)
  );

  return store;
}