import React, { Fragment, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

  const emailRef = useRef();

  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions ")
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <div className="alert alert-danger" role="alert"> {error}</div>}
          {message && <div className="alert alert-success" role="alert"> {message}</div>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <div className="label">Email</div>
              <input type="email" className="form-control" ref={emailRef} required />
            </div>
            <button disabled={loading} className="btn btn-lg btn-primary w-100 text-center mt-2">
            Reset Password
            </button>
          </form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Login</Link>
          </div>    
        </div>
      </div>

      <div className="w-100 text-center mt-2">Need an account?&nbsp;
        <Link to="/signup">Sign Up</Link>
      </div>
    </Fragment>
  );
}
