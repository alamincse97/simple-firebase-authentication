import './App.css';
import app from './firebase.init';
import{getAuth, GithubAuthProvider, GoogleAuthProvider, ProviderId, signInWithPopup, signOut} from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () =>{

    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error =>{
      console.log('error', error);
    })
  }

  const handleGithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
    })
  }
  const handleSignOut = () =>{
    signOut(auth)
    .then( () =>{
      setUser({});
    })
    .catch(error =>{
      setUser({});
    })
  }
  return (
    <div className="App">
      {/*{condition ? true : flase} */}
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      }
      <h2>Name: {user.displayName}</h2>
      <p>I Know Your Email Address: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
