import React, { Component } from "react";
import classes from "./Game.module.css";
import { classExpression } from "@babel/types";

import birddata from "../../data/data.json";
import LBdata from "../../data/leaderboard.json"
import AnsButton from "../../components/AnsButton/AnsButton";
import Breakround from "../../components/Breakround/Breakround"

// console.log(birddata);

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readytime: 2, //預備時間 5
      roundtime: 10, //回合時間 10
      IsCurrect: 0, //回答是否正確
      nexttime: 5, //回合中間休息時間 5
      round: 0, //第幾回合
      timestop: 0, //暫停時間
      timestoptext: "時間暫停並查看說明", //暫停顯示文字
      imglist: this.getImg(), //選中的圖片清單
      imgsrc: null, //圖片清單位置
      ansOption: null, //4個選項產生
      score: 0,  //分數
      plusscore: 0 //增加分數
    };
  }

  componentDidMount() {
    this.readytimeID = setInterval(() => this.tick(), 1000); //預備時間倒數
    this.imgrequire(this.state.imglist);
    this.setState(() => ({ ansOption: this.ansOptionGenerate() }));
  }
  componentWillUnmount() {
    this.readytimeID = clearInterval(this.readytimeID);
    this.roundtimeID = clearInterval(this.roundtimeID);
    this.nexttimeID = clearInterval(this.nexttimeID);
  }

  tick() {
    //預備時間倒數
    this.setState(state => ({ readytime: state.readytime - 1 }));
    if (this.state.readytime === 0) {
      this.readytimeID = clearInterval(this.readytimeID);
      this.roundtimeID = setInterval(() => this.roundtick(), 10); //啟動回合倒數
      this.setState(state => ({ round: state.round + 1 }));
    }
    // this.roundtimeID = clearInterval(this.roundtimeID);
  }

  roundtick() {
    //回合時間倒數
    this.setState(state => ({
      roundtime: Math.floor((state.roundtime - 0.01) * 100) / 100
    }));
    if (this.state.roundtime < 0) {
      this.breakround();
    }
  }

  breakround() {
    //回合中間休息
    this.setState(() => ({ ansOption: this.ansOptionGenerate() }));
    this.roundtimeID = clearInterval(this.roundtimeID);
    this.nexttimeID = setInterval(() => this.nexttick(), 1000); //啟動中間休息倒數
  }

  nexttick() {
    //回合中間倒數
    this.setState(state => ({ nexttime: state.nexttime - 1 }));
    if (this.state.nexttime === 0) {
      this.nexttimeID = clearInterval(this.nexttimeID);
      if (this.state.round !== 10) {
        this.setState(() => ({ nexttime: 5 }));
        this.setState(() => ({ roundtime: 10 }));
        this.setState(() => ({ IsCurrect: 0 }));
        this.setState(() => ({ plusscore: 0 }));
        this.setState(state => ({ round: state.round + 1 }));
        this.roundtimeID = setInterval(() => this.roundtick(), 10); //啟動回合倒數
      }
    }
  }

  timestop() {
    //時間暫停與繼續
    if (this.state.timestop === 0) {
      this.nexttimeID = clearInterval(this.nexttimeID);
      this.setState(() => ({ timestop: 1 }));
      this.setState(() => ({ timestoptext: "結束暫停" }));
    } else {
      this.nexttimeID = setInterval(() => this.nexttick(), 1000); //啟動中間休息倒數
      this.setState(() => ({ timestop: 0 }));
      this.setState(() => ({ timestoptext: "時間暫停並查看說明" }));
    }
  }

  leave() {
    //回首頁
    this.props.history.push("/");
  }

  getImg() {
    //獲得img清單
    var q20 = [];
    while (q20.length < 10) {
      let random = Math.floor(Math.random() * birddata.length);
      if (!q20.some(e => e === random)) {
        q20.push(random);
      }
    }
    // console.log("題庫:" + q20);
    return q20;
  }

  imgrequire(array) {
    //圖片資源載入
    let src = array.map(e => require(`./bird_img/${e}/1.JPG`));
    this.setState({ imgsrc: src });
    // console.log(src)
  }

  ansOptionGenerate() {
    //選項生成
    let ans = this.state.imglist[this.state.round];
    let list = [ans];
    while (list.length < 4) {
      let random = Math.floor(Math.random() * birddata.length);
      if (!list.some(e => e === random)) {
        list.push(random);
      }
    }
    let randomlist = [];
    while (randomlist.length < list.length) {
      let random = Math.floor(Math.random() * list.length);
      random = list[random];
      if (!randomlist.some(e => e === random)) {
        randomlist.push(random);
      }
    }
    // console.log(randomlist);
    return randomlist;
  }

  clickAnsOption(ans){
    if(ans===this.state.imglist[this.state.round-1]){
      let plusscore = Math.floor(this.state.roundtime *100);
      this.setState((state)=>({score: state.score+plusscore}))
      this.setState(() => ({ IsCurrect: 1 }));
      this.setState(() => ({ plusscore: plusscore }));
      this.breakround()
    }else {
      this.setState(state => ({
        roundtime: state.roundtime -2
      }));
    }
  }

  updatascore(){  //更新排行榜 //TODO:  沒有資料庫無用
    let min = 0;   //最小
    for(let i=0;i<LBdata.length;i++){
      if (LBdata[i].score < LBdata[min].score) {
        min = i;
      }
    };
    if(this.state.score>=LBdata[min].score){
      LBdata[min].score=this.state.score;
    } 
  }





  render() {
    if (this.state.readytime > 0) {
      return (
        <div>
          <h2>距離開始</h2>
          <h1>{this.state.readytime}</h1>
        </div>
      );
    } else if ((this.state.roundtime > 0) & (this.state.IsCurrect === 0)) {
      //require(`./bird_img/${this.state.imglist[this.state.round]}/1.JPG`)

      let buttondisplay = this.state.ansOption.map(e => (
        <AnsButton key={e} text={birddata[e].name} clicked={()=>this.clickAnsOption(e)}/>
      ));

      return (
        <div>
          <div className={classes.div_header}>第 {this.state.round} 題</div>
          <div className={classExpression.div_text}>
            剩餘作答時間: {Math.floor(this.state.roundtime) + 1}
          </div>
          <img
            src={this.state.imgsrc[this.state.round - 1]}
            alt=""
            className={classes.img}
          />

          <div className={classes.div_ctrl}>
            {/* <div className={classes.player}>p1</div> */}
            <div className={classes.btnArea}>{buttondisplay}</div>
            {/* <div className={classes.player}>p2</div> */}
          </div>

          <p>
            <button onClick={() => this.leave()}>離開</button>
          </p>
        </div>
      );
    } else if ((this.state.IsCurrect === 1) & (this.state.nexttime !== 0)) {
      return (
        <Breakround
          round={this.state.round}
          nexttime={this.state.nexttime}
          clicked={() => this.timestop()}
          timestoptext={this.state.timestoptext}
          text={"回答正確 !!"}
          plusscore={`+${this.state.plusscore}分`}
          score={this.state.score}
          ans={birddata[this.state.imglist[this.state.round-1]].name}
          discription={birddata[this.state.imglist[this.state.round-1]].discription}
        />
      );
    } else if ((this.state.IsCurrect === 0) & (this.state.nexttime !== 0)) {
      return (
        <Breakround
          round={this.state.round}
          nexttime={this.state.nexttime}
          clicked={() => this.timestop()}
          timestoptext={this.state.timestoptext}
          text={"再接再厲"}
          // plusscore={}
          score={this.state.score}
          ans={birddata[this.state.imglist[this.state.round-1]].name}
          discription={birddata[this.state.imglist[this.state.round-1]].discription}
        />
      );
    } else {
      return (
        <div>
          <h1>你的成績是</h1>
          <h1>{this.state.score}</h1>
          <button onClick={() => this.leave()}>返回首頁</button>
        </div>
      );
    }
  }
}
