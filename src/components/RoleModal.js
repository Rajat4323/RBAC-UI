import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/modal.css";

const RoleModal = ({
  show,
  onClose,
  onSave,
  currentRole,
  permissionOptions,
}) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [customPermission, setCustomPermission] = useState("");
  const [dynamicPermissions, setDynamicPermissions] = useState(permissionOptions);

  useEffect(() => {
    if (currentRole) {
      setName(currentRole.name);
      setPermissions(currentRole.permissions);
    } else {
      setName("");
      setPermissions([]);
    }
    setDynamicPermissions(permissionOptions); // Reset dynamic permissions on load
  }, [currentRole, permissionOptions]);

  const handlePermissionChange = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleAddCustomPermission = () => {
    if (!customPermission.trim()) {
      alert("Permission name is required");
      return;
    }
    if (!dynamicPermissions.includes(customPermission)) {
      setDynamicPermissions([...dynamicPermissions, customPermission]);
      setPermissions([...permissions, customPermission]);
      setCustomPermission(""); // Clear input
    } else {
      alert("Permission already exists");
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Role name is required");
      return;
    }
    onSave({ name, permissions });
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
              {currentRole ? "Edit Role" : "Add Role"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Permissions</label>
                {dynamicPermissions.map((permission) => (
                  <div className="form-check" key={permission}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    <label className="form-check-label">{permission}</label>
                  </div>
                ))}
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add custom permission"
                    value={customPermission}
                    onChange={(e) => setCustomPermission(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success mt-2"
                    onClick={handleAddCustomPermission}
                  >
                    Add Permission
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
