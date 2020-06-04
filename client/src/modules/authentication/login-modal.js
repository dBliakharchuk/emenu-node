import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Row,
  Col,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export const LoginModal = ({
  showModal,
  handleLogin,
  handleClose,
  loginError,
}) => {
  const handleSubmit = (event, errors, { email, password }) => {
    handleLogin(email, password);
  };

  return (
    <Modal
      isOpen={showModal}
      toggle={handleClose}
      backdrop="static"
      id="login-page"
      autoFocus={false}
    >
      <AvForm onSubmit={handleSubmit}>
        <ModalHeader id="login-title">Sign in</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger">
                  <strong>Failed to sign in!</strong> Please check your
                  credentials and try again.
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <AvField
                name="email"
                label="Email"
                placeholder="Provide yours email"
                required
                errorMessage="Username cannot be empty!"
                autoFocus
              />
              <AvField
                name="password"
                type="password"
                label="Password"
                placeholder="Provide your password!"
                required
                errorMessage="Password cannot be empty!"
              />
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
          {/* <Alert color="warning">
            <Link to="">Did you forget your password?</Link>
          </Alert> */}
          <Alert color="warning">
            <span>You don't have an account yet?</span>{' '}
            <Link to="/register">Register a new account</Link>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose} tabIndex="1">
            Cancel
          </Button>{' '}
          <Button color="primary" type="submit">
            Sign in
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};
