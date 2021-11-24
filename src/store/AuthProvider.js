import React, {useState, useEffect, useCallback} from 'react'; 
import AuthContext from './auth-context'; 

let logOutTimer; //this is a reference to a timeOut function

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); 
  const adjExpirationTime = new Date(expirationTime).getTime();
  return adjExpirationTime - currentTime; 
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate); 
  console.log(remainingTime, '✨');
  if(remainingTime <= 3600){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null; 
  }
  return {
    token: storedToken,
    duration: remainingTime
  }; 
}

// PROVIDER 🔥
const AuthProvider = ({children}) => {
  const tokenData = retrieveStoredToken(); 
  let initialToken; 
  if(tokenData){
    initialToken = tokenData.token;  
  }
  const [token, setToken] = useState(initialToken);   
  const userIsLoggedIn = !!token; 

  // Logout 🥸
  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    if(logOutTimer){
      clearTimeout(logOutTimer); 
    } 
  }, []);

  //Login 👀
  const loginHandler = (token, expirationTime) => {
    setToken(token); 
    localStorage.setItem('token', token);
    //stored the expiration time
    localStorage.setItem('expirationTime', expirationTime);
  };

  useEffect(() => {
    if(tokenData){
      console.log(tokenData.duration);
      logOutTimer = setTimeout(logoutHandler, tokenData.duration); 
    }else{
      console.log('No token data');
    }
  }, [tokenData, logoutHandler])

  
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
