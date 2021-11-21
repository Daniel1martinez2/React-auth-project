import { useState } from 'react';

import classes from './AuthForm.module.css';

const CREATE_USER_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoWnGyPHADLfvc3m3SGPw6LnX9Smab0xo'; 
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoWnGyPHADLfvc3m3SGPw6LnX9Smab0xo'; 

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const emailInputHandler = (e) => setEmailInput(e.target.value)
  const passwordInputHandler = (e) => setPasswordInput(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault();

    
    setEmailInput(''); 
    setPasswordInput(''); 
    let url; 
    //The request i different -> it depends wether is login or register
    if(isLogin){
      url = LOGIN_URL;
    }else{
      url = CREATE_USER_URL;
    }
    setIsLoading(true);
      fetch(url, {
        method: 'POST',
        body:JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(async response => {
        setIsLoading(false); 
        if(response.ok){
          console.log('✅');
          return response.json();
        }else{
          return response.json().then(errorData =>{
            console.log(errorData);
            let errorMessage = 'Authentication failed'; 
            throw new Error(errorMessage);
          });
        }
      }).then(data => {
        console.log(data);
      }).catch(err => {
        alert(err);
      }); 
    }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input 
            type='email' 
            id='email' 
            required 
            value={emailInput} 
            onChange={emailInputHandler}
            />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input 
            type='password' 
            id='password' 
            required 
            value={passwordInput}
            onChange={passwordInputHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading Take a Break 🍫</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
