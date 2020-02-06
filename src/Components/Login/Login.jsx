import React, {useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { errorToasterStyle, connectedToasterStyle } from '../../toasterConfig';

import { Input, Button } from 'reactstrap';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [login, setLogin] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const submitForm = () => {
    axios.post('http://localhost:5000/app/login/', form)
    .then(result => {
      if(result.status === 200) {
        setLogin(result.data.userId);
        localStorage.setItem('token', result.data.token);
        toast.info("vous êtes connectés à votre compte", connectedToasterStyle);
        setRedirect(true)
      } else {
        toast.error("Il y a une erreur dans les identifiants", errorToasterStyle);
      }
    })
  };

  return(
    <div className="inputContainer">
      <div className="container">
      <form className="mt-5">
      {redirect && <Redirect to="/menu" />}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <Input
                className="form-control-alternative input"
                id="inputEmail4"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={event => setForm({...form, email: event.target.value})}
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
                value={form.password}
                onChange={event => setForm({...form, password: event.target.value})}
              />
            </div>
          </div>
          <div className="buttonLign1">
            <Button type="button" className="pinkButton" 
            disabled={(form.email ==="" && form.password === "") ? true : false}
            onClick={submitForm}>submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;