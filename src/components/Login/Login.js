import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Login.module.css";

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
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
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
