import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";

import classes from "./Home.module.css";
import AdressError from "../../components/AdressError/AdressError";
import Leaderboard from "./Leaderboard/Leaderboard";
import Introduction from "../../components/Introduction/Introduction";

const Start = props => (
  <div>
    <Switch>
      <Route exact path="/home" component={Leaderboard} />
      <Route exact path="/home/Introduction" component={Introduction} />
      {/* <Redirect from="/home" to="/" /> */}
      <Route render={() => <AdressError />} />
    </Switch>

    <table className={classes.table}>
    <tbody>
      <tr>
      <th>
      <NavLink to="/" className={classes.App_link}>
        返回首頁
      </NavLink>
      &nbsp;&nbsp;
      </th>
      <th>
      <NavLink to="/home" className={classes.App_link} activeStyle={{ color: "#fa923f" }} exact>
        排行榜
      </NavLink>
      &nbsp;&nbsp;
      </th>
      <th>
      <NavLink to="/home/Introduction" className={classes.App_link} activeStyle={{ color: "#fa923f" }} exact      >
        遊戲介紹
      </NavLink>
      </th>
      </tr>
      </tbody>
    </table>

    <div className={classes.start}>
      <NavLink to="/game" className={classes.link}>
        START
      </NavLink>
    </div>
  </div>
);

export default Start;
