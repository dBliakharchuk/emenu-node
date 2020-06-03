import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  loginUser,
  logoutUser,
  getSession,
} from '../../store/actions/auth-action';

import { getUsers, getUser } from '../../store/actions/user-action';
import { getRestaurants } from '../../store/actions/restaurant-action';

export const InitPage = (props) => {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    const email = 'admin@gmail.com';
    const password = '1234';
    // props.logoutUser();

    props.loginUser(email, password);
    props.getSession();
    props.getUsers();
    props.getRestaurants();

    props.getUser('5ebd94cd30ddd22884220c3c');
  }, []);

  const { account } = props;
  console.log(props);
  return <div>Init Page</div>;
};

const mapStateToProps = ({
  restAuthReducer,
  userReducer,
  restaurantReducer,
}) => {
  return {
    users: userReducer.users,
    userById: userReducer.user,
    restaurants: restaurantReducer.restaurants,
    authorization: restAuthReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    loginUser,
    logoutUser,
    getSession,
    getUsers,
    getRestaurants,
    getUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(InitPage);
