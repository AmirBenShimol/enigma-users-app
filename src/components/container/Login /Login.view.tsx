import React from "react";
import { Link } from "react-router-dom";

import classes from "./Login.module.scss";

interface IProps {
  readonly userNameInput: string;
  readonly userPasswordInput: string;
  readonly onUserNameInputChange: (input: string) => void;
  readonly onUserPasswordInputChange: (input: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

const LoginView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <section className={classes["loginForm"]}>
      <div className={classes["innerForm"]}>
        <h1 className={classes["innerForm__title"]}>Login Page</h1>
        <form onSubmit={props.onSubmit}>
          <input
            type={"name"}
            placeholder="Enter User Name"
            value={props.userNameInput ?? ""}
            onChange={({ currentTarget: { value } }) =>
              props.onUserNameInputChange(value)
            }
          />

          <input
            type={"password"}
            placeholder="Enter User Pasword"
            value={props.userPasswordInput ?? ""}
            onChange={({ currentTarget: { value } }) =>
              props.onUserPasswordInputChange(value)
            }
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Register</Link>
      </div>
    </section>
  );
};

LoginView.displayName = "LoginView";
LoginView.defaultProps = {};

export default React.memo(LoginView);
