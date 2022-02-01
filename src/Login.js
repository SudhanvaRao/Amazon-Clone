import React, { useState } from "react";
import { Link, useNavigate as useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateEmail(event) {
    setEmail(event.target.value);
  }

  function signin(e) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history("/");
      })
      .catch((err) => alert(err.message));
  }

  function register(e) {
    e.preventDefault();

    //firebase thing
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history("/");
        }
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login-container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-main</h5>
          <input type="text" value={email} onChange={updateEmail} />
          <h5>Password</h5>
          <input type="password" value={password} onChange={updatePassword} />
          <button type="submit" onClick={signin} className="login-signinbutton">
            Sign-in
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login-registerButton">
          Create an Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
