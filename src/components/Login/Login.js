<<<<<<< HEAD
import React, { useState, useEffect, useReducer } from "react";
=======
import React, { useState, useEffect, useReducer, useContext } from "react";
>>>>>>> daaf79c996d3652bab3c3cda5234a438101076dd

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Login.module.css";
import AuthContext from "../../context/AuthContext";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
        emailIsValid: action.payload.includes("@"),
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
        passwordIsValid: action.payload.trim().length > 6,
      };
    case "INPUT_BLUR":
      return {
        ...state,
        emailIsValid: state.email.includes("@"),
        passwordIsValid: state.password.trim().length > 6,
      };
    default:
      return state;
  }
}

function Login() {
  const { onLogin } = useContext(AuthContext);

<<<<<<< HEAD
const emailReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { value: action.payload, isValid: action.payload.includes("@") };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
};

function Login(props) {
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        emailState.value.includes("@") && password.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value, password]);

  // const emailChangeHandler = (event) => setEmail(event.target.value);
  const emailChangeHandler = (event) =>
    dispatchEmail({ type: "UPDATE_EMAIL", payload: event.target.value });

  const passwordChangeHandler = (event) => setPassword(event.target.value);

  // const validateEmailHandler = () => setEmailIsValid(email.includes("@"));
  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });

  const validatePasswordHandler = () =>
    setPasswordIsValid(password.trim().length > 6);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, password);
=======
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    emailIsValid: null,
    password: "",
    passwordIsValid: null,
  });

  const { emailIsValid, passwordIsValid } = state;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatch({ type: "UPDATE_EMAIL", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: "UPDATE_PASSWORD", payload: event.target.value });
  };

  const validateHandler = () => {
    dispatch({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(state.email, state.password);
>>>>>>> daaf79c996d3652bab3c3cda5234a438101076dd
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
<<<<<<< HEAD
            emailState.isValid === false ? styles.invalid : ""
=======
            state.emailIsValid === false ? styles.invalid : ""
>>>>>>> daaf79c996d3652bab3c3cda5234a438101076dd
          }`}
        >
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
<<<<<<< HEAD
            value={emailState.value}
=======
            value={state.email}
>>>>>>> daaf79c996d3652bab3c3cda5234a438101076dd
            onChange={emailChangeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            state.passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={passwordChangeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button
            type="submit"
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
