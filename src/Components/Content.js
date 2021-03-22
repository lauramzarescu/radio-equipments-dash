import React from "react";
import "../styles/Content.css";

import { Switch, Route, Link } from "react-router-dom";
import routes from "../Actions/routes";

export const Content = () => {
  return (
    <>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </>
  );
};
