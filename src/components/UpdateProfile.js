import React, { Fragment, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [] 
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value){ // if password exists
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
    })
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <div className="alert alert-danger" role="alert"> {error}</div>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <div className="label">Email</div>
              <input type="email" className="form-control" ref={emailRef} defaultValue={currentUser.email} required />
            </div>

            <div className="form-group" id="password">
              <div className="label">Password</div>
              <input
                type="password"
                className="form-control"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
                
              />
            </div>

            <div className="form-group" id="password-confirm">
              <div className="label">Password Confirmation</div>
              <input
                type="password"
                className="form-control"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
                
              />
            </div>

            <button disabled={loading} className="btn btn-lg btn-primary w-100 text-center mt-2">
            Update
            </button>
          </form>
        </div>
      </div>

      <div className="w-100 text-center mt-2 color-red">
        <Link to="/">Cancel</Link>
      </div>
    </Fragment>
  );
}
