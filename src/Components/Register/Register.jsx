import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [addressName, setAddressName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [redirect, setRedirect] = useState('');

  // `ec_firstname` VARCHAR(255) NOT NULL,
  // `ec_lastname` VARCHAR(255) NOT NULL,
  // `ec_address` VARCHAR(255) NOT NULL,
  // `ec_email` VARCHAR(255) UNIQUE NOT NULL,
  // `ec_password` VARCHAR(255) NOT NULL

  const submitForm = () => {
    axios.post('http://localhost:8000/register',{
      firstname : firstname,
      lastname :lastname,
      address : addressName,
      email :email,
      password : password
    })
    .then((result)=> {
      if(result.status === 200) {
        setRedirect(true);
      }
      console.log('resultat', result);
    })
     .catch(error => console.log(error))
  };

  return(
      <form className="mt-5">
      {redirect && <Redirect to="/login"/>}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName4">FirstName</label>
            <input
              type="text"
              className="form-control"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              id="inputFirstName4"
              placeholder="Firstname"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName4">Lastname</label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              id="inputLastName4"
              placeholder="Lastname"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              value={email} onChange={(event) => setEmail(event.target.value)}
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="inputPassword4"
              placeholder="password"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputRetypePassword4">Retype Password</label>
            <input
              type="password"
              className="form-control"
              value={retypePassword}
              onChange={(event) => setRetypePassword(event.target.value)}
              id="inputRetypePassword4"
              placeholder="password"
            />
          </div>
          {password !== retypePassword && <p className="text-danger">Invalid password</p>}
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Adresse 1</label>
          <input type="text" className="form-control" value={addressName} onChange={(event) => setAddressName(event.target.value)} placeholder="adress" />
        </div>
        <button type="submit" className="submitButton" onClick={submitForm}>submit</button>
      </form>
  )
}

export default Register;