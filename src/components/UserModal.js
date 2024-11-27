import React, { useState, useEffect } from "react";
import "../styles/modal.css";
import "../App.css";

const UserModal = ({ show, onClose, onSave, currentUser }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Viewer"); // Default role
  const [status, setStatus] = useState("Active"); // Default status

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setRole(currentUser.role);
      setStatus(currentUser.status);
    } else {
      setName("");
      setRole("Viewer");
      setStatus("Active");
    }
  }, [currentUser]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    onSave({ name, role, status });
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {currentUser ? "Edit User" : "Add User"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
