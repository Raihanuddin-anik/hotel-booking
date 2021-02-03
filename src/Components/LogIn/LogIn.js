import React, { useContext } from 'react';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const LogIn = () => {

  var provider = new firebase.auth.GoogleAuthProvider();
  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleSingIn = () => {

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var { displayName, email } = result.user;
      var singedInUser = { displayName, email }
      setloggedInUser(singedInUser)
      StoreTokenAuth()
      
      // console.log(displayName, email)
      // ...  
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

      const StoreTokenAuth = () => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
              sessionStorage.setItem('token',idToken)
              history.replace(from)
              // Send token to your backend via HTTPS
              // ...
            }).catch(function (error) {
              // Handle error
            });
  }
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={() => handleSingIn()}>Sing in With google</button>
    </div>
  );
};

export default LogIn;