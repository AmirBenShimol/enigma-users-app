import React from "react";

import Welcome from "../components/container/Welcome";

interface IProps {}

const WelcomePage: React.FC<IProps> = () => {
  return <Welcome />;
};

WelcomePage.displayName = "Welcome";

export default WelcomePage;
