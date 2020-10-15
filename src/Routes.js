import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/Auth";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/login/ForgotPassword";
import MenuApp from "./components/MenuApp";
import { MenuPages } from "./config/MenuPages";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <MenuApp>
          {MenuPages.map((page) => {
            const innerPages = page.pages;
            const isParent = innerPages !== undefined;

            if (!isParent) {
              return (
                <PrivateRoute
                  exact
                  key={page.key}
                  path={page.path}
                  component={page.component}
                />
              );
            }

            return innerPages.map((child) => {
              return (
                <PrivateRoute
                  exact
                  key={child.key}
                  path={child.path}
                  component={child.component}
                />
              );
            });
          })}
        </MenuApp>
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </HashRouter>
  </div>
);

export default Routes;
