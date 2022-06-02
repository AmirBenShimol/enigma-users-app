import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";

import * as fromApp from "./store/app";
import * as userActions from "./store/actions/user";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import EditUser from "./components/container/Welcome/EditUser";
import { IUser } from "./interfaces/user";
import { IUsers } from "./interfaces/users";
import AddUser from "./components/container/Welcome/AddUser";

interface IPropsFromDispatch {
  setUser: (user: IUser, isAdmin: boolean) => userActions.SetUser;
  setUsers: (users: IUsers[]) => userActions.SetUsers;
}

interface PropsFromState {
  readonly isAuthenticated: boolean;
  readonly isAdmin: boolean;
}

interface IProps extends PropsFromState, IPropsFromDispatch {}

const App: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/auto-login`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        props.setUser({ username: data.data.username }, data.data.isAdmin);

        const users = data.data.users;

        if (users) {
          props.setUsers(users);
        }
      });
  }, []);

  return (
    <Suspense fallback={null}>
      <Switch>
        {!props.isAuthenticated && (
          <>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Redirect path="*" to="/login" />
          </>
        )}
        {props.isAuthenticated && (
          <>
            <Route path="/welcome">
              <Welcome />
            </Route>
            {props.isAdmin && (
              <>
                <Route path="/edit-user/:username">
                  <EditUser isAdmin={props.isAdmin} />
                </Route>
                <Route path="/add-user">
                  <AddUser isAdmin={props.isAdmin} />
                </Route>
              </>
            )}

            <Redirect path="*" to="/welcome" />
          </>
        )}
      </Switch>
    </Suspense>
  );
};

App.displayName = "App";

const mapDispatchToProps = (
  dispatch: Dispatch<userActions.UserTypes>
): IPropsFromDispatch => {
  return {
    setUser: (user: IUser, isAdmin: boolean): userActions.SetUser =>
      dispatch(userActions.setUser(user, isAdmin)),
    setUsers: (users: IUsers[]): userActions.SetUsers =>
      dispatch(userActions.setUsers(users)),
  };
};

const mapStateToProps = (state: fromApp.AppState) => {
  return {
    isAuthenticated: !!state.user.user,
    isAdmin: state.user.isAdmin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
