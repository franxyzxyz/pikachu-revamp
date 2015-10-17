var Game = function(){
  this.MAX_POINT = 21;
  this.COURT_SIZE = { width: null, height: null};
  this.START = false;
  // this.COURT_LIMIT = {x: null, y: null};
  this.CURRENT_PLAYER = "p1"; // <-start with P1 DEFAULT
  this.SCORE_TAKER = null;
  this.NET_HEIGHT = 250;
  this.NET_WIDTH = 10;
  this.p1 = null;
  this.p2 = null;
  this.ball = null;
  this.score = {p1: 0, p2:0};
  this.COURT_ORIGIN = {x: null, y:null},
  this.thresholdLevel = null;
  this.border = 5; // border width to check for boundary
};

Game.prototype.initialize = function(){
  if (!this.START) {
    this.COURT_ORIGIN.x = $("#court").offset().left;
    this.COURT_ORIGIN.y = $("#court").offset().top;
    this.COURT_SIZE.width = $("#court").width();
    this.COURT_SIZE.height = $("#court").height();
    this.thresholdLevel = $("#p1").offset().top;
    this.p1 = new Player();
    this.p2 = new Player();
    this.p1.initialize(this,"p1");
    this.p2.initialize(this,"p2");
  }
  this.ball = new Ball();
  this.ball.initialize(this,this[this.CURRENT_PLAYER]);
}

function CHECK_BOUNDARY(){
  //* game.ball *//
  var x = game.ball.position.x;
  var y = game.ball.position.y;
  var result = [];

  if (x <= game.COURT_ORIGIN.x + game.border){
    result.push("left-border");
  }else if (x >= game.COURT_SIZE.width + game.COURT_ORIGIN.x - game.ball.ballRadius - game.border){
    result.push("right-border");
  };
  if (y <= game.COURT_ORIGIN.y + game.border){
    result.push("top-border");
  }else if(y >= game.thresholdLevel){ // REMOVE LATER
    result.push("bottom-border"); // CASE: TOUCH GROUND
  };

  if (game.ball.t !== 0 && result.length !== 0){//TRAJ->BOUNC
    game.ball.t = 0;
    SUBSEQUENT_MOTION(result);
  }else if (result.length !== 0){ //NORMAL BOUNCE
    SUBSEQUENT_MOTION(result);
  }
  return result;
}

function SUBSEQUENT_MOTION(borderArray){
  if(borderArray.length !== 0){
    for (var k=0;k<borderArray.length;k++){
      switch(borderArray[k]){
        case "left-border":
          game.ball.position.x += game.border;
          game.ball.velocity.x *= -1;
          break;
        case "right-border":
          game.ball.position.x -= game.border;
          game.ball.velocity.x *= -1;
          break;
        case "top-border":
          // game.ball.position.y += increment
          game.ball.position.y += game.border;
          game.ball.velocity.y *= -1;
          break;
        case "bottom-border":
          game.ball.position.y -= game.border;
          game.ball.velocity.y *= -1;
          break;
      }
    };
  }
}