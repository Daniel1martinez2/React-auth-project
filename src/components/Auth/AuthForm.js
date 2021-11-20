import { useState } from 'react';

import classes from './AuthForm.module.css';

const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoWnGyPHADLfvc3m3SGPw6LnX9Smab0xo'; 

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
    
    //The request i different -> it depends wether is login or register
    if(!isLogin){
      setIsLoading(true)
      fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true
        }), 
        headers: {
          'Content-Type': 'application/json'
        }

      }).then(async res => {
        setIsLoading(false); 
        if(res.ok){
          // console.log(res);
        }else{
          const data = await res.json();
          //show an modal error
          let errorMessage = 'Authentication failed'; 
          if(data && data.error.message) errorMessage = data.error.message; 
          alert(errorMessage);
        }
      })
    }else{

    }

  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    console.log('sssss');
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
