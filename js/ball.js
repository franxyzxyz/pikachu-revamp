var Ball = function(){
  this.dt = 1;
  this.bouncing_t = 0;
  this.radiusRange = 80;
  this.ballRadius = 100;
  this.position = { x: null, y: null};
  this.velocity = { x: 5, y: -5};
  this.up = false;
  this.hit = false;
  this.init_pos = { x: null, y: null};
  this.init_vel = 100;
  this.angle = 0;
  this.g = 5; // [sensitivity parameter]
  this.idName = "#pika";
  this.t = 0;
};


Ball.prototype.initialize = function(parent,current_player){
  if (this.position.x == null || this.position.y == null){
    this.position.x = current_player.init_position.x + 30;
    this.position.y = parent.COURT_ORIGIN.y;
  }
  this.UPDATE_POSITION();

  this.start_BOUNCE();
};

Ball.prototype.UPDATE_POSITION = function(){
  $("#pika").offset({
    top: this.position.y,
    left: this.position.x
  })
}

var on_TIMER = {
  ball: null,
  p1: null,
  p2: null
};

var i;
Ball.prototype.start_BOUNCE = function(){
  on_TIMER.ball = setInterval(BOUNCE_MOTION,10);
}

function BOUNCE_MOTION(){
  game.ball.position.x += game.ball.velocity.x * game.ball.dt;
  game.ball.position.y += game.ball.velocity.y * game.ball.dt;

  CHECK_BOUNDARY();

  game.ball.UPDATE_POSITION();

  //TESTING PURPOSE SCENARIO TO MOCK UP TRAJCETORY START
  if (game.ball.position.x == 455.5 || game.ball.position.x < 0){
    clearInterval(on_TIMER.ball);
    on_TIMER.ball = null;
    game.ball.start_TRAJECTORY();
  }
}

Ball.prototype.start_TRAJECTORY = function(){
  on_TIMER.ball = setInterval(TRAJECTORY_MOTION,10);
}

function TRAJECTORY_MOTION(){
  if (game.ball.t == 0){
    game.ball.init_pos.x = game.ball.position.x;
    game.ball.init_pos.y = game.ball.position.y;
    game.ball.velocity.x *= 3; //TBC-UPON COLLISION
    game.ball.velocity.y *= 3; //TBC-UPON COLLISION
    game.ball.t += 0.2;
  } else {
    game.ball.position.x = game.ball.init_pos.x + game.ball.velocity.x * game.ball.t;
    game.ball.position.y = game.ball.init_pos.y + game.ball.velocity.y * game.ball.t + 0.5 * game.ball.g * Math.pow(game.ball.t,2);


    if (CHECK_BOUNDARY().length !== 0){
      clearInterval(on_TIMER.ball);
      on_TIMER.ball = null;
      game.ball.start_BOUNCE();
      game.ball.velocity.x /=3;
      game.ball.velocity.y /=3;
    }else{
      game.ball.UPDATE_POSITION();
      game.ball.t += 0.2;
    }
  };
}
