import React, {useState} from 'react'
import AuthContext from './auth-context'; 

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null); 
  
  const userIsLoggedIn = !!token; 

  const loginHandler = (token) => {
    setToken(token)
  };

  const logoutHandler = () => {
    setToken(null)
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
