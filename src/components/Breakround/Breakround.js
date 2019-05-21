import React from "react";

import classes from "./Breakround.module.css";

const breakround = props => {
  if (props.timestoptext === "時間暫停並查看說明") {
    return (
      <div>
        <h1>第 {props.round} 題</h1>
        <h3>
          {props.text} &nbsp;{props.plusscore}
        </h3>
        <h4>目前得分: {props.score}</h4>
        <h1>{props.nexttime}</h1>
        <button className={classes.btnAns} onClick={props.clicked}>{props.timestoptext}</button>
      </div>
    );
  }else{
    return (
      <div>
        <h1>第 {props.round} 題</h1>
        <h4>{props.ans} 的形態特徵:</h4>
        <p className={classes.content}>{props.discription}</p>
        <h5>剩餘時間: {props.nexttime}</h5>
        <button className={classes.btnAns} onClick={props.clicked}>{props.timestoptext}</button>
      </div>
    );
  }
};

export default breakround;
