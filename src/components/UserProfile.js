import React, { Fragment, useState, useEffect } from "react";
import {useAuth} from "../contexts/AuthContext";

export default function UserProfile( {match} ) {

  let user = match.params.id;

  const {getUser} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserPage = async () => {
    //e.preventDefault();
    try {
      setError("")
      setLoading(true);
      const unsub = await getUser(user)
      return unsub
    } catch (error){
      console.log(error)
      setError("User doesn't exist");
    }
    setLoading(false);
  }
  
  useEffect(() => {
    const unsub = handleUserPage();
    return unsub
  });

  return (
    <Fragment>
      {error && <div className="alert alert-danger" role="alert"> {error}</div>}
      {loading && <div className="alert alert-danger" role="alert"> Loading...</div>}

    </Fragment>
  );
}
