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

export const RegistrationModal = ({
  showModal,
  handleRegister,
  handleClose,
  registerError,
}) => {
  const handleSubmit = (
    event,
    errors,
    { email, password, firstName, lastName }
  ) => {
    handleRegister(email, password, firstName, lastName);
    !registerError && handleClose();
  };

  return (
    <Modal
      isOpen={showModal}
      toggle={handleClose}
      backdrop="static"
      id="registration-page"
      autoFocus={false}
    >
      <AvForm onSubmit={handleSubmit}>
        <ModalHeader id="registration-title">Registration</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              {registerError ? (
                <Alert color="danger">
                  <strong>Failed while registration User!</strong> Please check
                  your provided data and try again.
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <AvField
                name="firstName"
                label="First Name"
                placeholder="Provide yours first name"
                required
                errorMessage="First Name cannot be empty!"
                autoFocus
              />
              <AvField
                name="lastName"
                label="Last Name"
                placeholder="Provide yours last name"
                required
                errorMessage="Last Name cannot be empty!"
                autoFocus
              />
              <AvField
                name="email"
                label="Email"
                placeholder="Provide yours email"
                required
                errorMessage="Email cannot be empty!"
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
              <AvField
                name="repeat-password"
                type="password"
                label="Repeat password"
                placeholder="Repead your password!"
                required
                errorMessage="Repead password field cannot be empty!"
              />
            </Col>
          </Row>
          <Alert color="warning">
            <span>Did you register already?</span>{' '}
            <Link to="/login">Sign in to account</Link>
          </Alert>
          <div className="mt-1">&nbsp;</div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose} tabIndex="1">
            Cancel
          </Button>{' '}
          <Button color="primary" type="submit">
            Register
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};
