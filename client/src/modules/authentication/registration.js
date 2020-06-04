import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RegistrationModal } from './registration-modal';
import { createUser } from '../../store/actions/user-action';

const Register = (props) => {
  const [showModal, setShowModal] = useState(true);

  const handleRegister = (email, password, firstName, lastName) => {
    console.log('handleRegister', email, password, firstName, lastName);
    props.createUser(email, password, firstName, lastName);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  console.log(props);
  return showModal ? (
    <RegistrationModal
      showModal={showModal}
      handleRegister={handleRegister}
      handleClose={handleClose}
      registerError={props.userReducer.errorMessage}
    ></RegistrationModal>
  ) : (
    <Redirect to={'/'} />
  );
};

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = () => ({
  createUser,
});

export default connect(mapStateToProps, mapDispatchToProps())(Register);
