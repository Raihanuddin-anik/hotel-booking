import React, { createContext, useContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn/LogIn';
import Book from './Components/Book/Book';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


 export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h1> name: {loggedInUser.displayName}</h1>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/login">
              <LogIn/>
            </Route>
            <PrivateRoute path="/book/:bedType">
             <Book/>
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route> 
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
