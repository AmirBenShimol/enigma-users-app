import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// import { useHistory } from "react-router-dom";

import { IUsers } from "../../../interfaces/users";
import * as fromApp from "../../../store/app";
import * as userActions from "../../../store/actions/user";

import WelcomeView from "./Welcome.view";

interface IPropsFromState {
  readonly username: string;
  readonly users: IUsers[];
  readonly isAdmin: boolean;
}

interface IPropsFromDispatch {
  unsetUser: () => userActions.UnsetUser;
  setUsers: (users: IUsers[]) => userActions.SetUsers;
}

interface IProps extends IPropsFromState, IPropsFromDispatch {}

const Welcome: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  console.log(props.isAdmin);

  const onExitClick = () => {
    props.unsetUser();
    props.setUsers([]);

    localStorage.removeItem("token");
  };

  return (
    <WelcomeView
      onExitClick={onExitClick}
      username={props.username}
      users={props.users}
      isAdmin={props.isAdmin}
    />
  );
};

Welcome.displayName = "Welcome";
Welcome.defaultProps = {};

const mapDispatchToProps = (
  dispatch: Dispatch<userActions.UserTypes>
): IPropsFromDispatch => {
  return {
    unsetUser: (): userActions.UnsetUser => dispatch(userActions.unsetUser()),
    setUsers: (users: IUsers[]): userActions.SetUsers =>
      dispatch(userActions.setUsers(users)),
  };
};

const mapStateToProps = (state: fromApp.AppState) => {
  return {
    username: state.user.user!.username,
    users: state.user.users,
    isAdmin: state.user.isAdmin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
