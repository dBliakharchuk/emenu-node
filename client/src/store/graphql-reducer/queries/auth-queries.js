// import { gql } from 'apollo-boost';

export const logoutUser = `
  {
    logoutUser {
      name
    }
  }
`;

export const loginUser = `
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const getAccount = `
  mutation($accessToken: String!) {
    getAccount(accessToken: $accessToken) {
      name
      permission_role
      email
    }
  }
`;
