import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllUsers, deleteUser } from "../action/userActions";
import FormContainer from "../components/FormContainer";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

const UserListScreen = ({
  userList,
  getAllUsers,
  userInfo,
  deleteUser,
  userDelete,
  history,
}) => {
  const { users, error, loading } = userList;
  const { success: deleteSuccess } = userDelete;
  const onDeleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      deleteUser(id);
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getAllUsers();
    } else {
      history.push("/login");
    }
  }, [getAllUsers, deleteSuccess]);

  return (
    <>
      <h2>User</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : users ? (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td> {user._id}</td>
                <td> {user.name}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td> {user.isAdmin ? <p>Is Admin</p> : <p>Not Admin</p>}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => onDeleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Not yet</p>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  userList: state.userList,
  userInfo: state.userLogin.userInfo,
  userDelete: state.userDelete,
});
export default connect(mapStateToProps, { getAllUsers, deleteUser })(
  UserListScreen
);
