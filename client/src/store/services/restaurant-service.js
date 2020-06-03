import axios from 'axios';

import { getAuthorizationHeader } from '../utils/helpers';

const apiUrl = 'http://localhost:4000';

export const getRestaurantsService = async () => {
  const reqUrl = `${apiUrl}/restaurants`;
  const result = await axios.get(reqUrl, {
    headers: getAuthorizationHeader(),
  });

  console.log('getRestaurantsService:', result);
  return result;
};
