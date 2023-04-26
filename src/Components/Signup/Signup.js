import React, { useState, useContext } from 'react';
import { FirebaseContext } from "../../store/Context";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useHistory,Link } from "react-router-dom";


export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store error messages
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error state on form submit

    
  // Form validation
  if (!username || username.trim() === '') {
    setError('Please enter a valid username.');
    return;
  }

  if (!email) {
    setError('Please enter an email address.');
    return;
  }

  if (!phone || phone.trim().length !== 10) {
    setError('Please enter a valid 10-digit phone number.');
    return;
  }


  if (!password) {
    setError('Password should be atleast 4 cahracters');
    return;
  }


    // Signup with Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: username }).then(() => {
        console.log('userId from signup', result.user.uid);
        firebase.firestore().collection('users').doc(result.user.uid).set({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          history.push('/login');
        });
      });
    }).catch((error) => {
      setError(error.message); // Set error message from Firebase
    });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          {error && <p className="error" style={{ color: 'red' }}>{error}*</p>} {/* Display error message */}
          <br />
          <button>Signup</button>
        </form>
      <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
