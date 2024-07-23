import Keycloak from 'keycloak-js';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, logout as logoutAction } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const isRun = useRef(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const initKeycloak = async () => {
      const client = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
      });

      try {
        const res = await client.init({ onLoad: 'login-required' });
        const loginState = res ? { isLogin: true, token: client.token } : { isLogin: false, token: null };
        setIsLogin(loginState.isLogin);
        setToken(loginState.token);
        setKeycloak(client);
        dispatch(setLogin(loginState));
      } catch (err) {
        console.error('Failed to initialize Keycloak', err);
        setIsLogin(false);
        setToken(null);
        setKeycloak(null);
        dispatch(setLogin({ isLogin: false, token: null }));
      }
    };
    initKeycloak();
  }, [dispatch]);

  const logout = async () => {
    if (keycloak) {
      try {
        await keycloak.logout();
        setIsLogin(false);
        setToken(null);
        dispatch(logoutAction());
      } catch (err) {
        console.error('Failed to logout from Keycloak', err);
      }
    } else {
      console.error('Keycloak client is not initialized');
    }
  };

  return [isLogin, token, logout];
};

export default useAuth;
