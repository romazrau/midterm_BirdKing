import React, { Component } from "react";
import data from "./../../../data/leaderboard.json";

// console.log(data);
// import classes from "./Leaderboard.module.css";

export default class Leaderboard extends Component {
  render() {
    let list = []; //大小序列
    let min = 0;   //最小
    for(let i=0;i<data.length;i++){
      if (data[i].score < data[min].score) {
        min = i;
      }
    };
    while (list.length < data.length-1) {
      let mabemax = min;
      for (let i = 0; i < data.length; i++) {
        if (!list.some(e => e === i)&&data[i].score>=data[mabemax].score) {
          mabemax = i
        }
      }
      list.push(mabemax)
    }
    list.push(min);
    // console.log(list.map(e=>(data[e].score)))

  let display = list.map(e => {
    if (data[e].name) {
      return (
        <li key={e}>
          {data[e].name}得分:{data[e].score}
        </li>
      );
    }else{
      return " "
    }
  });

    return (
      <div>
        <h1>排行榜</h1>
        <ol>
          {display}
        </ol>
      </div>
    );
  }
}
