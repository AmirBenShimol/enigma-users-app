import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  readonly userNameInput: string;
  readonly userPasswordInput: string;
  readonly onUserNameInputChange: (input: string) => void;
  readonly onUserPasswordInputChange: (input: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

const RegisterView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <>
      <h1>REGISTER PAGE</h1>
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
        <button type="submit">Register</button>
      </form>

      <Link to="/login">Back to login</Link>
    </>
  );
};

RegisterView.displayName = "RegisterView";
RegisterView.defaultProps = {};

export default RegisterView;
