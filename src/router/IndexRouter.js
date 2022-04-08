import React, { useState, useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../views/login/Login/Login";
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
            <SideMenuRouter></SideMenuRouter>
          );
        }}
      />
    </HashRouter>
  )
}