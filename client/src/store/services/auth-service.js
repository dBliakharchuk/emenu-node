import axios from 'axios';

import { getAuthorizationHeader, AUTH_TOKEN_KEY } from '../utils/helpers';

const apiUrl = 'http://localhost:4001';

export const getSessionService = async () => {
  const result = await axios({
    method: 'get',
    url: `${apiUrl}/account`,
    headers: getAuthorizationHeader(),
  });
  console.log('getSessionService', result);

  return result;
};

export const loginUserService = async (request) => {
  console.log('loginUserService', request);
  const result = await axios({
    method: 'post',
    url: `${apiUrl}/login`,
    data: {
      email: request.email,
      password: request.password,
    },
    headers: { 'Content-Type': 'application/json' },
  });

  const accessToken = result.data.accessToken;
  accessToken && localStorage.setItem(AUTH_TOKEN_KEY, accessToken);

  return result;
};

export const logoutUserService = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
