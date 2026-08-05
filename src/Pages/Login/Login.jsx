import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("");
  const [notSignIn, setNotSignIn] = useState(false);

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    try {
      const item = JSON.parse(localStorage.getItem("myContacts"));
      setUsers(item || []);
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginFields((prev) => ({ ...prev, [name]: value }));
  };

  const addHandler = () => {
    if (!loginFields.email || !loginFields.password) {
      setAlert("Please fill all fields");
      setSuccess("");
      return;
    }

    const foundUser = users.find((user) => user.email === loginFields.email);

    if (!foundUser) {
      setAlert("User not found! Please sign up first.");
      setSuccess("");
      setNotSignIn(true);
      return;
    }

    if (foundUser.password !== loginFields.password) {
      setAlert("Incorrect password!");
      setSuccess("");
      return;
    }

    setAlert("");
    setSuccess(`Login successful! ✅ Welcome ${foundUser.firstName} !`);

    setTimeout(() => {
      setSuccess("");
    }, 2000);

    setLoginFields({
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          value={loginFields.email}
          onChange={changeHandler}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={loginFields.password}
          onChange={changeHandler}
          name="password"
        />
      </div>

      {alert && <p style={{ color: "red", margin: "10px 0" }}>{alert}</p>}
      <div>{notSignIn && <Link to="/" className={styles.notSignIn}> signIn Here! </Link>}</div>

      {success && <p style={{ color: "green", margin: "10px 0" }}>{success}</p>}

      <div className={styles.LoginButton}>
        <button onClick={addHandler}>Login</button>
      </div>

      <div className={styles.totalUsers}>Total users: {users.length}</div>
    </div>
  );
}

export default Login;
