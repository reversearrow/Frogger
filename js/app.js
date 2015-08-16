//Game Super-Class that every game object will require to do in this game.

var Game = function(image,x,y,width,height){
    this.sprite = "images/".concat(image)
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Game.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid

var Enemy = function(image,x,y,width,height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Game.call(this,image,x,y,width,height);
    this.speed = Math.floor((Math.random() * 5) + 1);
}

Enemy.prototype = Object.create(Game.prototype);
Enemy.prototype.constructor = Enemy

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x > 700) {
    	this.x = 0;
    }
    if (player.checkCollisions(this,this.width,this.height)) {player.resetgame()};
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var start_x = 300;
var start_y = 400;

player_height = 50;
player_width = 50;


var Player = function(image,x,y,width,height){
    Game.call(this,image,x,y,width,height);
}

Player.prototype = Object.create(Game.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    if (player.y < 30) {
        player.resetgame();
    }
}

Player.prototype.handleInput = function(key){
	if (key === "down" && player.y < 400){
		player.y += 83;
	}
	 else if (key === "up" && player.y > 0){
	 	player.y -= 83;
	 }
	 else if (key === "right" && player.x < 600){
	 	player.x += 100;
	 }
	 else if (key === "left" && player.x > 0){
	 	player.x -= 100;
	 }
};

Player.prototype.checkCollisions = function(object,object_width,object_height) {
    if (object.x < (this.x + this.width) && (object.x + object_width) > this.x &&
        object.y < (this.y + this.height) && (object_height + object.y) > this.y) {
        return true
    }
}

Player.prototype.resetgame = function () {
    player.x = start_x;
    player.y = start_y;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//Adding Gems to the screen

var Gems = function(image,x,y,width,height) {
    Game.call(this,image,x,y,width,height)
}

Gems.prototype = Object.create(Game.prototype);
Gems.prototype.constructor = Gems;

Gems.prototype.update = function() {
     if (player.checkCollisions(this,this.width,this.height)) {
        allGems.pop(this)
        console.log(allGems)
    };
}


var enemy1 = new Enemy("enemy-bug.png",-60,310,50,50);
var enemy2 = new Enemy("enemy-bug.png",-60,166,50,50);

allEnemies = [enemy1,enemy2];


var blue_gem = new Gems("Gem-Blue.png",100,150,50,50);
//var green_gem = new Gems("Gem-Green.png",500,150,50,50);

allGems = [blue_gem];

var player = new Player("char-boy.png",start_x,start_y,player_width,player_height);

