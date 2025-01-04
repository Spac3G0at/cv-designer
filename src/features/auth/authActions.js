// src/features/auth/AuthActions.js
import { loginSuccess, logout } from './authSlice';

export const login = (user, token) => (dispatch) => {
  localStorage.setItem('isLogged', 'true');
  dispatch(loginSuccess({ user, token }));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('isLogged');
  dispatch(logout());
};
