import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Toaster
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Home from './Components/Home/Home';
import Edit from './Components/Edit/Edit';
import Menu from './Components/Menu/Menu';
import Forms from './Components/Edit/Forms/Forms';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './App.css';


function App() {
  return (
    <div>
      <NavigationBar />
      <ToastContainer />
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
        <Route path={`${process.env.PUBLIC_URL}/edit`} component={Edit} />
        <Route path={`${process.env.PUBLIC_URL}/menu`} component={Menu} />
        <Route path={`${process.env.PUBLIC_URL}/form`} component={Forms} />
      </Switch>
    </div>
  );
}

export default App;
