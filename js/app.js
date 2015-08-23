/* App.js
 * This file contains one super class called Game from where sub-classes such as Enemy and Player inherits many of the similar functionalities,
 * that are required for the game.
 */

//

var Game = function(image,x,y,width,height){
	/* This is a game superclass. This contains methods for assigninng image to object,
	* position x and y to the object and defining their width and height.
	*/
	this.sprite = "images/".concat(image)
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

//Render method is added to the prototype object of the Game.
Game.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(image,x,y,width,height) {
	/* Enemy class from where all the enemy objects are instantiated.
	* This object takes image name, x position, y position, widht and height of the object.
	* This object method for showing the object on the screen with appropriate height and width from the Game super class.
	* When enemy object is instantiated from this Class, random speed level from 1 to 5 is assigned to the object.
	*/
	Game.call(this,image,x,y,width,height);
	this.speed = Math.floor((Math.random() * 5) + 1);
}

//Creating a prototype chain and delegating failed look ups to Game.prototype.
Enemy.prototype = Object.create(Game.prototype);

//Making sure .constructor property of all the objects instantiated from the Enemy class points to the enemy class as its constructor.
Enemy.prototype.constructor = Enemy

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed;
	// This checks if the position of the enemy is > 700. It is reset it's position to 0.
	if (this.x > 700) {
		this.x = 0;
	}
	//The if statement calls for the player.collide method to check against all the enemies.
	//If collision si found then it will call the resetgame() method of the player object.
	//Also it will reduce one life from the player's total lives.
	//It checks for the players lives, if lives is 0 then it will display Game Over.
	if (player.collide(this,this.width,this.height)) {
		player.resetgame()
		player.lives -= 1;
		if (player.lives === 0) {
			console.log("Game Over")
		}
	};
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Starting x and y position for the player.
var start_x = 300;
var start_y = 400;

// Height and width of the player to check the collision against objects
var player_height = 50;
var player_width = 50;


var Player = function(image,x,y,width,height){
	Game.call(this,image,x,y,width,height);
	this.score = 0;
	this.lives = 5;
}

Player.prototype = Object.create(Game.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
	if(player.y < 30) {
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

Player.prototype.collide = function(object,object_width,object_height) {
	if(object.x < (this.x + this.width) && (object.x + object_width) > this.x &&
		object.y < (this.y + this.height) && (object_height + object.y) > this.y) {
	return true
	}
}

Player.prototype.resetgame = function () {
	player.x = start_x;
	player.y = start_y;
}

Player.prototype.reset = function () {
	player.x = start_x;
	player.y = start_y;
	this.score = 0;
	this.lives = 5;
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

Gems.prototype.update = function(){
};


var enemy1 = new Enemy("enemy-bug.png",-60,310,50,50);
var enemy2 = new Enemy("enemy-bug.png",-60,166,50,50);

allEnemies = [enemy1,enemy2];


var blue_gem = new Gems("Gem-Blue.png",100,150,50,50);
var green_gem = new Gems("Gem-Green.png",500,150,50,50);

allGems = [blue_gem,green_gem];

var player = new Player("char-boy.png",start_x,start_y,player_width,player_height);




