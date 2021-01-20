import React, { Fragment, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory} from "react-router-dom";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const unsub = await signIn(emailRef.current.value, passwordRef.current.value);
      history.push("/"); //unmount
      return unsub;
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
    
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
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

            <button disabled={loading} className="btn btn-lg btn-primary w-100 text-center mt-2">
            Log In
            </button>
          </form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>    
        </div>
      </div>

      <div className="w-100 text-center mt-2">Need an account?&nbsp;
        <Link to="/signup">Sign Up</Link>
      </div>
    </Fragment>
  );
}
