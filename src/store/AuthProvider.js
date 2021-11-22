import React, {useState} from 'react'
import AuthContext from './auth-context'; 

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); 
  const adjExpirationTime = new Date(expirationTime).getTime();
  
  return adjExpirationTime - currentTime; 
}

const AuthProvider = ({children}) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken); 
  
  const userIsLoggedIn = !!token; 

  
  const logoutHandler = () => {
    localStorage.removeItem('token'); 
    setToken(null)
  };
  
  const loginHandler = (token, expirationTime) => {
    setToken(token)
    localStorage.setItem('token', token);

    const remainingTime = calculateRemainingTime(expirationTime); 

    setTimeout(logoutHandler, remainingTime)

  };
  
  const authContextValue = {
    token: token, 
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }; 

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
