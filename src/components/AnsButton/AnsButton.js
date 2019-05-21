import React from "react";

import classes from "./AnsButton.module.css";

const AnsButton = props => (
  <div>
    <button className={classes.btnAns} onClick={props.clicked}>{props.text}</button>
  </div>
);

export default AnsButton;
