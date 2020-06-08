import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutUser } from '../../store/actions/auth-action';

export const Logout = ({ logoutUser }) => {
  useEffect(logoutUser, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Logout);
