/* App.js
 * This file contains one super class called Game from where sub-classes such as Enemy and Player inherits many of the similar functionalities,
 * that are required for the game.
 */

allEnemies= [];

var Game= function(image,x,y,width,height){
	/* This is a game superclass. This contains methods for assigninng image to object,
	* position x and y to the object and defining their width and height.
	*/
	this.sprite= "images/".concat(image);
	this.x= x;
	this.y= y;
	this.width= width;
	this.height= height;
};

//Render method is added to the prototype object of the Game.
Game.prototype.render= function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy= function(image,x,y,width,height){
	/* Enemy class from where all the enemy objects are instantiated.
	* This object takes image name, x position, y position, widht and height of the object.
	* This object method for showing the object on the screen with appropriate height and width from the Game super class.
	* When enemy object is instantiated from this Class, random speed level from 1 to 5 is assigned to the object.
	*/
	Game.call(this,image,x,y,width,height);
	this.speed= Math.floor((Math.random() * 6) + 1);
};

//Creating a prototype chain and delegating failed look ups to Game.prototype.
Enemy.prototype= Object.create(Game.prototype);

//Making sure .constructor property of all the objects instantiated from the Enemy class points to the enemy class as its constructor.
Enemy.prototype.constructor= Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update= function(dt){
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed;
	// This checks if the position of the enemy is > 700. It is reset it's position to 0.
	if (this.x > 700){
		this.x= 0;
	}
	//The if statement calls for the player.collide method to check against all the enemies.
	//If collision si found then it will call the resetgame() method of the player object.
	//Also it will reduce one life from the player's total lives.
	//It checks for the players lives, if lives is 0 then it will display Game Over.
	if (player.collide(this,this.width,this.height)){
		player.resetgame();
		player.lives -= 1;
		if (player.lives=== 0){
			document.getElementsByClassName("game-over")[0].style.display = 'block';
		}
	}
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Starting x and y position for the player.
var START_X= 300;
var START_Y= 400;

// Height and width of the player to check the collision against objects
var PLAYER_HEIGHT= 50;
var PLAYER_WIDTH= 50;


var Player= function(image,x,y,width,height){
	/* This is a player class from where player object is instantiated.
	* This object takes image name, x position, y position, widht and height of the object.
	* This object method for showing the object on the screen with appropriate height and width from the Game super class.
	* When player object is instantiated from this Class, score and lives are assigned to that object.
	*/
	Game.call(this,image,x,y,width,height);
	this.score= 0;
	this.lives= 5;
};

//Creating a prototype chain and delegating failed lookup methods to the Game.prototype.
Player.prototype= Object.create(Game.prototype);

//Adding .constructor property to the Player.prototype object.
Player.prototype.constructor= Player;

//Update method for the player. When player reaches the water it will reset the game.
Player.prototype.update= function(){
	if(this.y < 30){
		this.resetgame();
	}
};

// This method is to handle incoming keyboard input. Based on the input value it will increase or reduce the x or y values.
Player.prototype.handleInput= function(key){
	if (key=== "down" && this.y < 400){
		this.y += 83;
	}
	else if (key=== "up" && this.y > 0){
		this.y -= 83;
	}
	else if (key=== "right" && this.x < 600){
		this.x += 101;
	}
	else if (key=== "left" && this.x > 0){
		this.x -= 101;
	}
};

//This is a collision detection method for the player object.
//When enemy will coliide to the player, it will return true.
Player.prototype.collide= function(object,object_width,object_height){
	if(object.x < (this.x + this.width) && (object.x + object_width) > this.x &&
		object.y < (this.y + this.height) && (object_height + object.y) > this.y){
	return true;
	}
};

//This method will reset the position of the player. This method will put the player to it's starting position.
Player.prototype.resetgame= function (){
	this.x= START_X;
	this.y= START_Y;
};

//This method will reset the player objects starting postion as well as its score and lives.
Player.prototype.reset= function (){
	this.x= START_X;
	this.y= START_Y;
	this.score= 0;
	this.lives= 5;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e){
	var allowedKeys={
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});

//Instantiating the Enemies object
var ENEMY_Y = 0;
for (i=0; i<6; i++){
	x= Math.floor(Math.random() * (-200 - 70 + 1)) - 70;
	ENEMY_Y += 50;
	allEnemies.push(new Enemy("enemy-bug.png",x,ENEMY_Y,68,68));
}
//Instantiating the Player object
var player= new Player("char-boy.png",START_X,START_Y,PLAYER_WIDTH,PLAYER_HEIGHT);

