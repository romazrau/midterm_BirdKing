import React from "react";
import { NavLink } from "react-router-dom";

import logo from "./r1.png";
import classes from "./AdressError.module.css";

const Start = props => (
  <div>
    <img src={logo} className={classes.App_logo} alt="logo" />
    <h1>Adress Error</h1>
    <NavLink to="/" className={classes.App_link}>
      Back to Home
    </NavLink>
  </div>
);

export default Start;
