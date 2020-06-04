import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LoginModal } from './login-modal';
import { loginUser } from '../../store/actions/auth-action';

const Login = (props) => {
  const [showModal, setShowModal] = useState(
    props.authorization.showModalLogin
  );

  const handleLogin = (email, password) => {
    props.loginUser(email, password);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  console.log(props);
  return props.authorization.loginSuccess || !showModal ? (
    <Redirect to={'/'} />
  ) : (
    <LoginModal
      showModal={showModal}
      handleLogin={handleLogin}
      handleClose={handleClose}
      loginError={props.authorization.loginError}
    ></LoginModal>
  );
};

const mapStateToProps = ({ restAuthReducer }) => ({
  authorization: restAuthReducer,
});

const mapDispatchToProps = () => ({
  loginUser,
});

export default connect(mapStateToProps, mapDispatchToProps())(Login);
