import { LOGIN } from '../actions';

export default function login(state = null, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state , login: action.username }
  default:    
    return state;
  }
}
