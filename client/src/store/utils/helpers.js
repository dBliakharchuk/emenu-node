// Constants
export const AUTH_TOKEN_KEY = 'accessToken';

export const getAuthorizationHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
});
