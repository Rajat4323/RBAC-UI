import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import "../styles/HomePage.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out",
      offset: 50,
      once: true,
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4" data-aos="fade-down">
          Welcome to RBAC Dashboard
        </h1>
        <p className="lead" data-aos="fade-up">
          Manage Users, Roles, and Permissions seamlessly.
        </p>
      </div>

      <div className="row mt-5">
        <div className="col-md-4" data-aos="flip-left">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">
                Add, edit, or delete users. Assign roles and manage their
                status.
              </p>
              <Link to="/users" className="btn btn-primary">
                Go to Users
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4" data-aos="flip-right">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Manage Roles</h5>
              <p className="card-text">
                Create and assign roles. Define permissions dynamically.
              </p>
              <Link to="/roles" className="btn btn-success">
                Go to Roles
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4" data-aos="zoom-in">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">View Reports</h5>
              <p className="card-text">
                Analyze user activity and access detailed reports.
              </p>
              <button className="btn btn-info" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
