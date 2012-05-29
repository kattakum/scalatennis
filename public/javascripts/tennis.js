//////////////////////////
// 大域変数
//////////////////////////
var width,height;
var ctx;
var timerID;
var servepos,servno;
var rackets = [];
var ball;
var handan; //
var comppos,humanpos;
var bkcolor,color;
var phase,counter;
var finalscore;
var compspeed,myspeed;
var soundon = 1;
var playern =1;
var phase_demo = 0;
var phase_gamestart = 1;
var phase_playstart = 2;
var phase_exitcheck = 3;
var phase_gameend = 4;
var phase_play = 10;
//////////////////////////
// 初期化
//////////////////////////
onload = function() {
  // 画面表示用コンテキストの取得
  var canvas = document.getElementById('gamefield');
  if (!canvas || !canvas.getContext) {
    alert("本ページの閲覧はHTML5対応ブラウザで行ってください");
    return false;
  }
  ctx = canvas.getContext('2d');
  // 大域変数の初期化
  width = 800;
  height = 600;
  ctx.fillStyle="rgb(0,0,0)";
  ctx.fillRect(0,0,width,height);
  compspeed = 5;
  compspeedx =3;
  myspeed = 5;
  myspeedx=3;
  rackets.push(new racket(0));
  rackets.push(new racket(1));
  ball = new ball();
  comppos = 0;
  humanpos = 1;
  servepos = comppos;
  counter = 0;
  phase = phase_demo;
  bkcolor = "rgb(0,255,0)";
  initPlay(comppos);
  serveno = 1;
  if (window.opera) {
    // フォーカスオブジェクトの設定
    document.getElementById("focusarea").style.top = "320px";
    document.getElementById("focusarea").style.left = "360px";
    document.focusform.focustext.focus();
  }
  // キーボードイベント関数の設定
  window.addEventListener('keydown',keydownfunc,true);
  window.addEventListener('keyup',keyupfunc,true);
  // タイマーイベント関数の設定
  timerID = setInterval('timerfunc()', 33);
}

///////////////////////////////
// ラケットクラス
///////////////////////////////
function racket(pos) {
  this.pos = pos;
  this.width = 4*width/320;
  this.height = 30*height/240;
  if (pos == 0) {//コンピュータのポジション
    this.x = 20*width/320;
  } else {//プレイヤーのポジション
    this.x = width-20*width/320;
  }
  //this.x とthis.y　は初期位置を表す
  this.y = (height-this.height)/2;
  this.dx = 0;
  this.dy = 0;
  this.checked = 0;
  this.score = 0;
  this.updatepos = function() {
    this.y += this.dy;
    this.x += this.dx;
    //下記で限界位置を決めている。-this.height < ラケットのy座標 <　this.height　の範囲でしか動くことができない。
    //サイドラインの制限
    if (this.y < -this.height) {
      this.y = -this.height;
    }else if (this.y > height) {
      this.y = height;
    }
    //エンドラインの制限
    if (this.x < 2*width/320) {
      this.x = 2*width/320;
    }else if (this.x > width-2*width/320-4*width/320) {
      this.x = width-2*width/320-4*width/320;
    }
    //ハーフラインの制限
    if (pos == 0 && this.x > width/2-2*width/320-4*width/320) {
    	this.x = width/2-2*width/320-4*width/320;
    }else if(pos != 0 && this.x < width/2+2*width/320){
    	this.x = width/2+2*width/320;
    }
  }
  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.lineCap = "round";
    if(this.x < width/2){
	ctx.strokeStyle= "rgb(255,0,0)"
    }else{
    ctx.strokeStyle = "rgb(61,1,255)";
    }
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y+this.height);
    ctx.stroke();
  }
}
///////////////////////////////
// ボールクラス
///////////////////////////////
function ball() {
  this.enable = 1;
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.radius = 2*width/320;
  this.setpos = function(x,y) {
    this.x = x;
    this.y = y;
  }
  this.setspeed = function(dx,dy) {
    this.dx = dx;
    this.dy = dy;
  }
  this.updatepos = function() {
    if (this.enable == 0) {
      return;
    }
    this.x += this.dx;
    this.y += this.dy;
    // 壁チェック
    if (this.y <= 8*height/240 && this.dy < 0) {
      this.dy *= -1;
      playAudio("audio_wallhit");
    } else if (this.y >= (height-8*height/240) && this.dy > 0) {
      this.dy *= -1;
      playAudio("audio_wallhit");
    }
  }
  this.draw = function() {
    if (this.enable == 0) {
      return;
    }
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,false);
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.stroke();
  }
}
///////////////////////////////
// 音声出力
///////////////////////////////
function playAudio(name) {
   if (soundon == 0) {
      return;
   }
   if (phase == phase_play || phase == phase_gamestart) {
     try {
       document.getElementById(name).currentTime = 0;
       document.getElementById(name).volume = 1.0;
       document.getElementById(name).play();
     } catch (e) {
       // for IE9
       document.getElementById(name).volume = 1.0;
       document.getElementById(name).play();
     }
   }
}





///////////////////////////////
// コンピュータのラケット操作
///////////////////////////////
function docompmove() {
  for (i = 0; i < 2; i++) {
    if (phase != phase_demo && i != comppos) {
      continue;
    }
    if ((i == 1 && ball.dx > 0) || (i == 0 && ball.dx < 0)) {
      if (ball.y < rackets[i].y+rackets[i].height/4) {
        rackets[i].dy = -compspeed*height/240;
      } else if (ball.y > rackets[i].y+rackets[i].height*3/4) {
        rackets[i].dy = compspeed*height/240;
      } else if (Math.random() < 0.8) {
        rackets[i].dy = 0;
      }
    }else{
    	rackets[i].dy = 0;
    	/*if(racket[i].x　< width/4){
    		rackets[i].dx = compspeedx*width/400;
    		}else {
    		rackets[i].dx = -(compspeedx*width/400);
    		}*/
    }
  }
}





/////////////////////////////////
// 1プレイの初期化
/////////////////////////////////
function initPlay(servepos) {
  if (servepos == 0) {
    ball.setpos(rackets[0].x+rackets[0].width, rackets[0].y+rackets[0].height/2);
    ball.setspeed(+1*4*width/320, (Math.random()*4-2)*height/240);
  } else {
    ball.setpos(rackets[1].x-ball.radius*2, rackets[1].y+rackets[1].height/2);
    ball.setspeed(-1*4*width/320, (Math.random()*4-2)*height/240);
  }
  rackets[comppos].checked = 0;
  rackets[humanpos].checked = 0;
}







////////////////////////////////
// 位置更新と各種チェック
////////////////////////////////
function update() {
  var playend,win;
  if(playern==1){
  docompmove();
  }
  rackets[0].updatepos();
  rackets[1].updatepos();
  ball.updatepos();
  // レシーブチェック
  if (ball.x < (rackets[0].x+rackets[0].width) && ball.dx < 0 && rackets[0].checked == 0) {
    rackets[0].checked = 1;
    if (ball.y > rackets[0].y && ball.y < (rackets[0].y+rackets[0].height)) {
      ball.dx *= -1;
      if (ball.y < (rackets[0].y+rackets[0].height/4)) {
        ball.dy -= 2*height/240;
      } else if (ball.y > (rackets[0].y+rackets[0].height*3/4)) {
        ball.dy += 2*height/240;
      } else {
        if (rackets[0].dy == 0) {
          ball.dx = 4*width/320;
        } else {
          ball.dx *= 1.5;
        }
      }
      playAudio("audio_stroke");
      rackets[0].checked = 0;
    }
  }
  if ((ball.x+ball.radius*2) > rackets[1].x && ball.dx > 0 && rackets[1].checked == 0) {
    rackets[1].checked = 1;
    if (ball.y > rackets[1].y && ball.y < (rackets[1].y+rackets[1].height)) {
      ball.dx *= -1;
      if (ball.y < (rackets[1].y+rackets[1].height/4)) {
        ball.dy -= 2*height/240;
      } else if (ball.y > (rackets[1].y+rackets[1].height*3/4)) {
        ball.dy += 2*height/240;
      } else {
        if (rackets[1].dy == 0) {
          ball.dx = -4*width/320;
        } else {
          ball.dx *= 1.5;
        }
      }
      playAudio("audio_stroke");
      rackets[1].checked = 0;
    }
  }
  // Play終了チェック
  playend = win = 0;
  if (ball.x < 0) {
    playend = 1;
    if (humanpos == 1) {
      win = 1;
    }
    if (phase == phase_demo || phase == phase_play) {
      rackets[1].score += 1;
    }
  } else if (ball.x > width) {
    playend = 1;
    if (humanpos == 0) {
      win = 1;
    }
    if (phase == phase_demo || phase == phase_play) {
      rackets[0].score += 1;
    }
  }
  if (playend) {
    if (win) {
      playAudio("audio_win");
    } else {
      playAudio("audio_loss");
    }
    if (rackets[0].score >= 10 && rackets[1].score >= 10) {
      if (rackets[0].score == rackets[1].score) {
        finalscore = rackets[0].score+2;
      }
    }
    if (rackets[0].score == finalscore || rackets[1].score == finalscore) {
      // ゲーム終了
      if (phase == phase_demo) {
        rackets[0].score = rackets[1].score = 0;
        initPlay(servepos);
      } else {
        counter = 0;
        phase = phase_gameend;
      }
    } else {
      // 次のサーブ
      if (phase == phase_demo) {
        initPlay(servepos);
        serveno += 1;
        if (serveno == 2) {
          servepos = (servepos+1)%2;
          serveno = 0;
        }
      } else if (phase == phase_play) {
        counter = 0;
        phase = phase_playstart;
      }
    }
  }
}
/////////////////////////////////
// コートの表示
/////////////////////////////////
function drawcourt() {
  ctx.beginPath();
  ctx.lineWidth = 2*width/320;
  ctx.strokeStyle = "rgb(255,255,255)";
  ctx.moveTo(0,8*height/240);
  ctx.lineTo(width,8*height/240);
  ctx.moveTo(0,height-8*height/240);
  ctx.lineTo(width,height-8*height/240);
  disp = 0;
  for (y = 8*height/240; y < height-8*height/240; y+=4*height/240) {
    if (disp != 0) {
      ctx.moveTo(width/2,y);
      ctx.lineTo(width/2,y+4*height/240);
      disp = 0;
    } else {
      disp = 1;
    }
  }
  ctx.moveTo(width/4,8*height/240);
  ctx.lineTo(width/4,height-8*height/240);
  ctx.moveTo(3*width/4,8*height/240);
  ctx.lineTo(3*width/4,height-8*height/240);
  ctx.moveTo(width/4,height/2);
  ctx.lineTo(3*width/4,height/2);
  ctx.stroke();
  // スコア表示
  ctx.fillStyle = "rgb(255,100,0)";
  ctx.font = "48px 'Times New Roman'";
  var tm = ctx.measureText(rackets[0].score);
  ctx.fillText(rackets[0].score,width/2-10*width/320-tm.width,220*height/240);
  ctx.fillText(rackets[1].score,width/2+10*width/320,220*height/240);
  // サーブ権表示
  var num = 2-serveno;
  var str = "Next Serve";
  ctx.fillStyle = "rgb(255,100,0)";
  ctx.font = "20px 'Times New Roman'";
  tm = ctx.measureText(str);
  if (servepos == 0) {
    ctx.fillText(str,20*width/320,220*height/240);
  } else {
    ctx.fillText(str,width-tm.width-20*width/320,220*height/240);
  }
}

//////////////////////////////


/////////////////////////////////
// タイトル画面の表示
/////////////////////////////////
function drawtitle(count) {
  var str,tm;
  // タイトル表示
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.font = "italic 48px 'Times New Roman'";
  str = "Kattakum";
  tm = ctx.measureText(str);
  ctx.fillText(str,(width-tm.width)/2,100*height/240);

  if ((count % 40) < 35) {
  	ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "30px 'Times New Roman'";
    str = "Press [Enter] to Start";
    tm = ctx.measureText(str);
    ctx.fillText(str,(width-tm.width)/2,130*height/240);
  }

  ctx.font = "30px 'Times New Roman'";
  if (soundon) {
    str = "Sound [ON]";
  } else {
    str = "Sound [OFF]";
  }
  tm = ctx.measureText(str);
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(str,(width-tm.width)/2,150*height/240);

  ctx.font = "30px 'Times New Roman'";
  if (playern ==1) {
    str = "[1] PLAYER";
  } else {
    str = "[2] PLAYER";
  }
  tm = ctx.measureText(str);
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(str,(width-tm.width)/2,180*height/240);
  }



/////////////////////


/////////////////////////////////
// 終了確認の表示
/////////////////////////////////
function drawexitquery() {
  var str,tm;
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.font = "italic 56px 'Times New Roman'";
  str = "Exit Game ?";
  tm = ctx.measureText(str);
  ctx.fillText(str,(width-tm.width)/2,100*height/240);
  ctx.font = "16px 'Times New Roman'";
  str = "Press [Y] or [N]";
  tm = ctx.measureText(str);
  ctx.fillText(str,(width-tm.width)/2,150*height/240);
}


//////////////////////////


/////////////////////////////////
// ゲーム終了の表示
/////////////////////////////////
function drawwinloss() {
  var str,tm;
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.font = "italic 56px 'Times New Roman'";
  if (rackets[humanpos].score == finalscore) {
    str = "You Win !";
  } else {
    str = "You Lose";
  }
  tm = ctx.measureText(str);
  ctx.fillText(str,(width-tm.width)/2,height/2);
}

/////////////////////////////



/////////////////////////////////
// 画面の描画
/////////////////////////////////
function draw() {
  // 画面消去
  ctx.fillStyle = bkcolor;
  ctx.fillRect(0, 0, width, height);
  // コート表示
  drawcourt();
  // ラケット表示
  for (i = 0; i < 2; i++) {
    rackets[i].draw();
  }
  // ボール表示
  ball.draw();
}


/////////////////////////////



////////////////////////////////
// タイマーイベント関数
////////////////////////////////
function timerfunc() {
  switch (phase) {
  case phase_demo:
    counter += 1;
    update();
    color = "rgb(0,0,0)";
    draw();
    drawtitle(counter);
    break;
  case phase_gamestart:
    counter += 1;
    if (counter == 33*2) {
      phase = phase_play;
      rackets[0].score = rackets[1].score = 0;
      initPlay(servepos);
      serveno = 1;
    }
    color = "rgb(0,0,0)";
    ball.enable = 0;
    update();
    draw();
    break;
  case phase_playstart:
    counter += 1;
    if (counter == 33*2) {
      counter = 0;
      phase = phase_play;
      playAudio("audio_playstart");
      initPlay(servepos);
      serveno += 1;
      if (serveno == 2) {
        servepos = (servepos+1)%2;
        serveno = 0;
      }
    }
    color = "rgb(0,0,0)";
    ball.enable = 0;
    update();
    draw();
    break;
  case phase_exitcheck:
    color = "rgb(255,255,255)";
    ball.enable = 1;
    draw();
    drawexitquery();
    break;
  case phase_gameend:
    color = "rgb(255,255,255)";
    ball.enable = 0;
    draw();
    drawwinloss();
    counter += 1;
    if (counter == 33*5) {
      counter = 0;
      phase = phase_demo;
      ball.enable = 1;
      rackets[0].score = rackets[1].score = 0;
      servepos = comppos;
      initPlay(servepos);
      serveno = 1;
    }
    break;
  default:
    update();
    color = "rgb(0,0,0)";
    ball.enable = 1;
    draw();
  }
}
/////////////////////////////////////
// キーボードイベント関数
/////////////////////////////////////
function keyupfunc(event) {
  var code = event.keyCode;
  rackets[humanpos].dy = 0;
  rackets[humanpos].dx = 0;
  if(playern==2){
  	rackets[comppos].dx =0;
  	rackets[comppos].dy =0;
  }
}
function keydownfunc(event) {
  var code = event.keyCode;
  if (window.opera) {
    // フォーカスオブジェクトの設定
    document.focusform.focustext.focus();
  }
  switch (code) {
  case 83:
    // Sキー
    if (phase == phase_demo) {
      if (soundon == 1) {
        soundon = 0;
      } else {
        soundon = 1;
      }
    }
    break;
   case 71:
    // gキー
    if (phase == phase_demo) {
      if (playern == 1) {
        playern = 2;
      } else {
        playern = 1;
      }
    }
    break;
  case 89:
    // Yキー
    if (phase == phase_exitcheck) {
      phase = phase_demo;
    }
    break;
  case 78:
    // Nキー
    if (phase == phase_exitcheck) {
      phase = phase_play;
    }
    break;
  case 27:
    // Escキー
    if (phase == phase_play) {
      phase = phase_exitcheck;
    }
    break;
    ////////左プレイヤーの操作
    case 65:
    ///A
    if (phase != phase_demo && playern==2) {
      rackets[comppos].dx = -myspeedx*width/400;
    }
    event.preventDefault();
    break;
    case 68:
    // Dキー
    if (phase != phase_demo && playern==2) {
      rackets[comppos].dx = myspeedx*width/400;
    }
    event.preventDefault();
    break;
    /////上下のラケットの動き
  case 87:
    // ↑キー
    if (phase != phase_demo && playern==2) {
      rackets[comppos].dy = -myspeed*height/300;
    }
    event.preventDefault();
    break;
  case 88:
    // ↓キー
    if (phase != phase_demo && playern==2) {
      rackets[comppos].dy = myspeed*height/300;
    }
    event.preventDefault();
    break;
    //////////////////////////////
    //////////右側の操作////////

  case 39:
    // ←キー
    if (phase != phase_demo) {
      rackets[humanpos].dx = myspeedx*width/400;
    }
    event.preventDefault();
    break;

  case 37:
    // →キー
    if (phase != phase_demo) {
      rackets[humanpos].dx = -myspeedx*width/400;
    }
    event.preventDefault();
    break;
    /////上下のラケットの動き
  case 38:
    // ↑キー
    if (phase != phase_demo) {
      rackets[humanpos].dy = -myspeed*height/300;
    }
    event.preventDefault();
    break;
  case 40:
    // ↓キー
    if (phase != phase_demo) {
      rackets[humanpos].dy = myspeed*height/300;
    }
    event.preventDefault();
    break;
   case 13:
   // Enterキー
    if (phase == 0) {
      humanpos = 1;
      comppos = 0;
      finalscore = 11;
      servepos = comppos;
      serveno = 0;
      counter = 0;
      phase = phase_gamestart;
      playAudio("audio_gamestart");
    }
    event.preventDefault();
    break;
  }
}