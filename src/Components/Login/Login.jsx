import React, {useState } from 'react';
import { toast } from 'react-toastify';
import { errorToasterStyle, connectedToasterStyle } from '../../toasterConfig';
import axios from 'axios';
import { Input, Button } from 'reactstrap';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const submitForm = () => {
    axios.post('http://localhost:5000/login', login)
    .then((result) => {
      if(result.data.code === 200) {
        localStorage.setItem('token', result.data.token);
        toast.info("vous êtes connectés à votre compte", connectedToasterStyle);
      } else {
        toast.error("Il y a une erreur dans les identifiants", errorToasterStyle);
      }
    })
  }

  return(
    <div className="inputContainer">
      <div className="container">
      <form className="mt-5">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <Input
                className="form-control-alternative input"
                id="inputEmail4"
                placeholder="Email"
                type="email"
                value={login.email}
                onChange={event => setLogin({...login, email: event.target.value})}
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
                value={login.password}
                onChange={event => setLogin({...login, password: event.target.value})}
              />
            </div>
          </div>
          <div className="buttonLign1">
            <Button type="button" className="pinkButton" 
            disabled={(login.email ==="" && login.password === "") ? true : false}
            onClick={submitForm}>submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;