import React from "react";
import { NavLink} from "react-router-dom";

import b1 from "./b1.png";
import classes from "./start.module.css";

var img = b1;


const Start = props => (
  <div>
    <img src={img} className={classes.App_logo} alt="logo" />
    <h1>
      鳥鳥知識王
    </h1>
    <NavLink to="/home" className={classes.App_link} >
      PLAY
    </NavLink>
  </div>
);

export default Start;
