import React, { useState, useEffect } from "react";
import RoleModal from "../components/RoleModal";
import { fetchRolesApi } from "../api/fakeApi";
import AOS from "aos";
import "aos/dist/aos.css";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const permissionOptions = ["Read", "Write", "Delete"];

  const fetchRoles = async () => {
    const data = await fetchRolesApi();
    setRoles(data);
  };

  const handleAddRole = () => {
    setCurrentRole(null);
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setShowModal(true);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
  };

  const handleSaveRole = (newRole) => {
    if (currentRole) {
      const updatedRoles = roles.map((role) =>
        role.id === currentRole.id ? { ...role, ...newRole } : role
      );
      setRoles(updatedRoles);
    } else {
      setRoles([...roles, { id: roles.length + 1, ...newRole }]);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center" data-aos="fade-down">
        Role Management
      </h1>
      <button
        className="btn btn-primary mb-3"
        onClick={fetchRoles}
        data-aos="zoom-in"
      >
        Fetch Roles
      </button>
      <button className="btn btn-success mb-3 ms-2" onClick={handleAddRole}>
        Add Role
      </button>

      <table className="table table-bordered" data-aos="fade-left">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} data-aos="flip-left">
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditRole(role)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <RoleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveRole}
        currentRole={currentRole}
        permissionOptions={permissionOptions}
      />
    </div>
  );
};

export default RolePage;
