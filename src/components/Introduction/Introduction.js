import React from "react";

import classes from "./Introduction.module.css";


const Introduction = props => (
  <div>
 
    <h1>
      遊戲介紹
    </h1>
    <p className={classes.content}>
      這是一款認鳥遊戲，進入遊戲後將依序出現10題鳥類照片，每題10秒，獲得的分數隨時間遞減，答錯答題時間減少2秒。
    </p>
  </div>
);

export default Introduction;
