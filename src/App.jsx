import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Home from './Components/Home/Home';
import Edit from './Components/Edit/Edit';
import Menu from './Components/Menu/Menu';
import Forms from './Components/Edit/Forms/Forms';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import UserCTX from './Context/UserCTX';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {

  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    ec_address: null,
    ec_email: null,
    ec_firstname: null,
    ec_lastname: null,
  });
 
  useEffect(() => {
   if (localStorage.getItem('token')) {
     axios.get('http://localhost:5000/app/register/',{
       headers: {
         Authorization : `Bearer ${localStorage.getItem('token')}`
       }
     })
      .then((response, err) => {
        if(err) {
          console.log(err);
        }
        setUser(response.data)
      })
   } else {
     //redirect login
     setRedirect(true);
   }
  },[])

  
  return (
    <div>
      {redirect && <Redirect to="/login" />}
      <NavigationBar />
      <ToastContainer />
      <Switch>
        <UserCTX.Provider value= {user}>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
          <Route path={`${process.env.PUBLIC_URL}/edit`} component={Edit} />
          <Route path={`${process.env.PUBLIC_URL}/menu`} component={Menu} />
          <Route path={`${process.env.PUBLIC_URL}/form`} component={Forms} />
          <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register} />
          <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
        </UserCTX.Provider>
      </Switch>
    </div>
  );
}

export default App;
