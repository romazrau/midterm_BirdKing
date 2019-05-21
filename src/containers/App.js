import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import classes from './App.module.css'
import Start from "../components/start/start";
import AdressError from "../components/AdressError/AdressError";
import Home from './home/Home'
import Game from './Game/Game'



function App() {
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <header className={classes.App_header}>

          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/home" component={Home} />
            <Route path="/game" component={Game} />
            {/* <Redirect from="/home" to="/" /> */}
            <Route render={() => <AdressError />} />
          </Switch>
          
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
