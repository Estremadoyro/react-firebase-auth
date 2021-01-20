import React, { Fragment, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const unsub = await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
      return unsub; //unmount
    } catch {
      setError("There is an account already linked with the same email");
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <div className="alert alert-danger" role="alert"> {error}</div>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <div className="label">Email</div>
              <input type="email" className="form-control" ref={emailRef} required />
            </div>

            <div className="form-group" id="password">
              <div className="label">Password</div>
              <input
                type="password"
                className="form-control"
                ref={passwordRef}
                required
              />
            </div>

            <div className="form-group" id="password-confirm">
              <div className="label">Password Confirmation</div>
              <input
                type="password"
                className="form-control"
                ref={passwordConfirmRef}
                required
              />
            </div>

            <button disabled={loading} className="btn btn-lg btn-primary w-100 text-center mt-2">
            Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="w-100 text-center mt-2">Already have an account?&nbsp;
      <Link to="/login">Log in</Link></div>
    </Fragment>
  );
}
