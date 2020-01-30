import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connectedToasterStyle } from '../../toasterConfig';
import { Input, Button } from 'reactstrap';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Register() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [addressName, setAddressName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  // `ec_firstname` VARCHAR(255) NOT NULL,
  // `ec_lastname` VARCHAR(255) NOT NULL,
  // `ec_address` VARCHAR(255) NOT NULL,
  // `ec_email` VARCHAR(255) UNIQUE NOT NULL,
  // `ec_password` VARCHAR(255) NOT NULL

  const submitForm = () => {
    axios.post('http://localhost:5000/register',{
      firstname : firstname,
      lastname :lastname,
      address : addressName,
      email :email,
      password : password
    })
    .then((result)=> {
      if(result.status === 200){
        setRedirect(true)
        toast.error("Vous vous êtes enregistrés", connectedToasterStyle);
      }
      console.log(result);
      
    }) 
  };

  return(
    <div className="inputContainer">
      <div className="container">
        <form className="mt-5">
        {redirect && <Redirect to="/login" />}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirstName4">Prénom</label>
              <Input
                className="form-control-alternative input"
                id="inputFirstName4"
                placeholder="Prénom"
                type="text"
                value={firstname}
                onChange={event => setFirstname(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName4">Nom</label>
              <Input
                className="form-control-alternative input"
                id="inputLastName4"
                placeholder="Nom"
                type="text"
                value={lastname}
                onChange={event => setLastname(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <Input
                className="form-control-alternative input"
                id="inputEmail4"
                placeholder="Email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <Input
                className="form-control-alternative input"
                id="inputPassword4"
                placeholder="password"
                autoComplete="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputRetypePassword4">Retype Password</label>
              <Input
                className="form-control-alternative input"
                id="inputRetypePassword4"
                placeholder="password"
                autoComplete="password"
                type="password"
                value={retypePassword}
                onChange={event => setRetypePassword(event.target.value)}
              />
            </div>
            {password !== retypePassword && <p className="text-danger">Invalid password</p>}
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Adresse 1</label>
            <Input type="text" className="form-control-alternative input" value={addressName} onChange={(event) => setAddressName(event.target.value)} placeholder="votre adresse" />
          </div>
          <div className="buttonLign1">
            <Button type="button" className="pinkButton" onClick={submitForm}>Enregistrez</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;