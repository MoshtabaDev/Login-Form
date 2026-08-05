import { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Link } from "react-router-dom";

function SignIn() {
  const [alert, setAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");
  const [success, setSuccess] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [emailValidate, setEmailValidate] = useState("");

  const email = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return emailRegex.test(email);
  };

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem("myContacts");
      return savedContacts ? JSON.parse(savedContacts) : [];
    } catch (error) {
      console.error("Error loading contacts:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("myContacts", JSON.stringify(contacts));
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  }, [contacts]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const addHandler = () => {
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.password ||
      !contact.confirmPassword
    ) {
      setAlert("Please fill all fields");
      return;
    }

    if (!email(contact.email)) {
      setEmailValidate(
        "Please enter a valid email address (example@domain.com)",
      );
      return;
    }
    setEmailValidate("");

    if (contact.password !== contact.confirmPassword) {
      setPassAlert("Passwords do not match!");
      return;
    }

    setAlert("");
    setPassAlert("");
    setEmailValidate("");

    const newContact = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      password: contact.password,
    };

    setContacts((prev) => [...prev, newContact]);
    setSuccess("Sign Up Successfully! ✅");
    setLoginSuccess(true);

    setTimeout(() => {
      setSuccess("");
    }, 2000);

    setContact({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.header}>Sign Up</h1>
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="First Name"
          value={contact.firstName}
          onChange={changeHandler}
          name="firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={contact.lastName}
          onChange={changeHandler}
          name="lastName"
        />
        <input
          type="text"
          placeholder="Email"
          value={contact.email}
          onChange={changeHandler}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={contact.password}
          onChange={changeHandler}
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={contact.confirmPassword}
          onChange={changeHandler}
          name="confirmPassword"
        />
      </div>

      <div>{alert && <p style={{ color: "red" }}>{alert}</p>}</div>
      <div>{passAlert && <p style={{ color: "red" }}>{passAlert}</p>}</div>
      <div>
        {emailValidate && <p style={{ color: "red" }}>{emailValidate}</p>}
      </div>

      <div
        className={
          success ? styles.succesMessageShow : styles.succesMessageHide
        }
      >
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>

      <div>
        {loginSuccess && (
          <Link to="/login" className={styles.loginSucces}>
            {" "}
            Login Here!{" "}
          </Link>
        )}
      </div>

      <div className={styles.signUpButton}>
        <button onClick={addHandler}>Sign Up</button>
        <div className={styles.divider}>
          <span>or</span>
        </div>
        <div className={styles.signUpDirectly}>
          <button>Sign Up with Google</button>
          <FcGoogle className={styles.googleIcon} />
          <ImGithub className={styles.githubIcon} />
          <button>Sign Up with GitHub</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
