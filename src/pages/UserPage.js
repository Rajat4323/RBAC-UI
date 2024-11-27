import React, { useState, useEffect } from "react";
import UserModal from "../components/UserModal";
import AOS from "aos";
import "aos/dist/aos.css";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleSaveUser = (newUser) => {
    if (currentUser) {
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
    } else {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center" data-aos="fade-down">
        User Management
      </h1>
      <button className="btn btn-success mb-3 ms-2" onClick={handleAddUser}>
        Add User
      </button>

      <table className="table table-bordered" data-aos="fade-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} data-aos="flip-left">
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveUser}
        currentUser={currentUser}
      />
    </div>
  );
};

export default UserPage;
