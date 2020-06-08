import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../store/actions/user-action';

export const InitPage = (props) => {
  // const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    // props.getUser('5ebd94cd30ddd22884220c3c');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(props);
  return (
    <div>
      Init Page
      <br />
    </div>
  );
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
    getUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(InitPage);
