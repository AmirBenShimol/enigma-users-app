import React from "react";
import { Link } from "react-router-dom";
import { IUsers } from "../../../interfaces/users";
import UsersTable from "./UsersTable";

import classes from "./Welcome.module.scss";

interface IProps {
  readonly username: string;
  readonly users: IUsers[];
  readonly isAdmin: boolean;
  readonly onExitClick: () => void;
}

const WelcomeView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <section className={classes["welcomeContainer"]}>
      <div className={classes["innerHeader"]}>
        <h1 className={classes["innerHeader__title"]}>Welcome</h1>
      </div>

      <UsersTable usersList={props.users} isAdmin={props.isAdmin} />

      <Link to="/login" className={classes["backToLoginButtonContainer"]}>
        <button
          className={classes["backToLoginButtonContainer__button"]}
          type="button"
          onClick={props.onExitClick}
        >
          Logout
        </button>
      </Link>
    </section>
  );
};

WelcomeView.displayName = "WelcomeView";
WelcomeView.defaultProps = {};

export default WelcomeView;
