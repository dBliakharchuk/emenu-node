import axios from 'axios';

import { getAuthorizationHeader } from '../utils/helpers';

const apiUrl = 'http://localhost:4000';
// Actions
export const getUsersService = async () => {
  const reqUrl = `${apiUrl}/users`;
  const result = await axios.get(reqUrl, {
    headers: getAuthorizationHeader(),
  });

  console.log('getUsersSevice: ', result);
  return result;
};

export const getUserService = async (request) => {
  const reqUrl = `${apiUrl}/user?userId=${request.userId}`;
  const result = await axios.get(reqUrl, {
    headers: getAuthorizationHeader(),
  });

  console.log('getUserService: ', result);
  return result;
};

export const createUserService = async (request) => {
  const reqUrl = `${apiUrl}/users`;
  const result = await axios({
    method: 'post',
    url: reqUrl,
    data: {
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
    },
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
};
