import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../store/actions/user-action';

const UsersEntities = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      {users &&
        users.map((user, i) => <div key={`user-${i}`}>{user.name}</div>)}
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  users: userReducer.users,
});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersEntities);
