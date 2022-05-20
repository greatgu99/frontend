import React, { useState, useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../views/login/Login/Login";
import Register from "../views/login/Register/Register";
import NotFound from "../views/login/NotFound/NotFound";
import SideMenuRouter from "./sideMenuRouter/sideMenuRouter";
export default function IndexRouter(props) {
  return (
    <HashRouter>
      <Route
        path="/"
        render={() => {
          return localStorage.getItem("token") ? (
            <SideMenuRouter></SideMenuRouter>
          ) : (
            <Switch>
              <Route path="/Login" component={Login} />
              <Route path="/Register" component={Register} />
              <Redirect from="/" to="/Login" exact />
              {/* *匹配任意字符，匹配任何未匹配到的页面 */}
              <Route path="*" component={NotFound} />
            </Switch>
          );
        }}
      />
    </HashRouter>
  )
}