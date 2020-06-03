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
