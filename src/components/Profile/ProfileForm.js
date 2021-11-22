import React, {useContext, useState} from 'react'
import AuthContext from '../../store/auth-context';
import {CHANGE_PASSWORD_URL} from '../../utils/gitKeys';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const [inputValue, setInputValue] = useState(''); 
  const authCtx = useContext(AuthContext); 
  const {token} = authCtx;
  const history = useHistory();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(CHANGE_PASSWORD_URL, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password:inputValue,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( response => {
      if(response.ok){
        console.log('letsss gooo');
        return response.json();
      }else{
        return response.json().then(dataError => {
          throw new Error('oops')
        }); 
      }
    }).then(data => {
      console.log(data);
      history.replace('/')
    }).catch( err => {
      alert(err)
    }); 

  }
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
