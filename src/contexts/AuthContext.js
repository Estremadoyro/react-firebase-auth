import React, {useContext, useEffect, useState} from "react";
import {auth} from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  //returns all AuthContext values which are 
  //currentUser,
  // signUp,
  // signIn,
  // logout,
  // resetPassword,
  // updateEmail,
  // updatePassword
  // after rendering
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  }

  const getUser = (uid) => {
    return auth.getUser(uid);
  }


  useEffect(() => {
    //default user is null
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, [])

  const value ={
    currentUser,
    signUp,
    signIn,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getUser
  }

  return (
  
    //Asign AuthContext value, so it can be accessed by all components
    <AuthContext.Provider value={value}>
    
      {!loading && children}
    
    </AuthContext.Provider>
  );
}
