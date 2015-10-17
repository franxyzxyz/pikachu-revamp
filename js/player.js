var Player = function(){
  this.init_position = {x: null, y: null};
  this.position = { x: null, y: null };
  this.velocity = { x: null, y: null };
  this.init_pos = { x: null, y: null };
  this.up = false;
  this.hit = false;
  this.g = 15;
  this.t_p = 0;
  this.dimension = { width: 120, height: 85};
  this.name = null;
  this.thresholdLevel = null;
  this.traj = {
    velocity: { x: 0, y: -100}
  };
  this.score = 0;
  this.touch = 0;
};

Player.prototype.initialize = function(parent,name){
  this.name = name;
  this.dimension.width = $("#p1").width();
  this.dimension.height = $("#p1").height();
  switch(name){
    case "p1":
      this.init_position.x = parent.COURT_ORIGIN.x + 100;
      break;
    case "p2":
      this.init_position.x = parent.COURT_ORIGIN.x + parent.COURT_SIZE.width - 100 - this.dimension.width;
      break;
  };
  this.init_position.y = parent.thresholdLevel;

  this.position.x = this.init_position.x;
  this.position.y = this.init_position.y;

  this.UPDATE_POSITION();
}

Player.prototype.UPDATE_POSITION = function(){
  $("#" + this.name).offset({
    top: this.position.y,
    left: this.position.x
  })
}