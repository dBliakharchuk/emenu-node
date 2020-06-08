import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LoginModal } from './login-modal';
import { loginUser } from '../../store/actions/auth-action';

const Login = ({ authorization, loginUser }) => {
  const [showModal, setShowModal] = useState(!authorization.isAuthenticated);

  const handleLogin = (email, password) => {
    loginUser(email, password);
    !authorization.loginError && handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return showModal && !authorization.isAuthenticated ? (
    <LoginModal
      showModal={showModal}
      handleLogin={handleLogin}
      handleClose={handleClose}
      loginError={authorization.loginError}
    ></LoginModal>
  ) : (
    <Redirect to={'/'} />
  );
};

const mapStateToProps = ({ restAuthReducer }) => ({
  authorization: restAuthReducer,
});

const mapDispatchToProps = () => ({
  loginUser,
});

export default connect(mapStateToProps, mapDispatchToProps())(Login);
