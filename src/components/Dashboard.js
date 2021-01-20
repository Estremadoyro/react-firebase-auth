import React, {Fragment, useState} from 'react'
import { useAuth } from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function Dashboard() {

  const [error, setError] = useState("");
  const {currentUser, logout} = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logout()
      history.push("/login");
    } catch {
      setError("Failed to logout")
    }

  }
  return (
    <Fragment>
      <div className="card">
        <div className="card-boddy">
          <h2 className="text-center mb-4">Profile</h2>
          {error && <div className="alert alert-danger" role="alert"> {error}</div>}
          <strong>Email:</strong> {currentUser.email}
          <Link to= "/update-profile" className="btn btn-primary w-100 mt-3">
            Update profile
          </Link>
        </div>
      </div>

      <div className="w-100 text-center mt-2">
        <button className="btn btn-link" onClick={handleLogout}>Log out</button>
      </div>
    </Fragment>
  )
}
