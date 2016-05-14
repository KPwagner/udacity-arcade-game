// x and y offsets are global variables used to consistently
// align sprites. enemyRows defines how many enemies per row
// and the speed of those enemies.
var xOffset,
    yOffset,
    enemyRows;

// Offset values are based on the engine.js render() function
xOffset = 101;
yOffset = 83;

//
enemyRows = {
    "top": {
        "num": 3,
        "speed": 100
    },
    "middle": {
        "num": 2,
        "speed": 100
    },
    "bottom": {
        "num": 2,
        "speed": 50
    }
};

// Enemies our player must avoid
var Enemy = function(speed, startPosX, startPosY) {
    this.sprite = 'images/enemy-bug.png';
    this.x = startPosX;
    this.y = startPosY;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // if statement loops enemy sprites.
    if (this.x > 500){
        this.x = -200;
    }
    // TODO: troubleshoot use of dt variable. Seems to make animations worse.
    this.x = this.x + 1 * this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.startPosX = xOffset * 2;
    this.startPosY = 60 + yOffset * 4;
    this.x = this.startPosX;
    this.y = this.startPosY;
};

Player.prototype.update = function(dt){
    // This function is left blank because I didn't need it. However,
    // the instructions said to include an update function for player.
};

// draw the player to the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// valid keyboard inputs are up, down, left, and right
Player.prototype.handleInput = function(key){
    switch(key){
        case 'up':
            if (this.y < 10){
                break;
            } else {
                this.y = this.y - yOffset;
            }
            break;
        case 'down':
            if (this.y > 390){
                break;
            } else {
                this.y = this.y + yOffset;
            }
            break;
        case 'left':
            if (this.x < 10) {
                break;
            } else {
                this.x = this.x - xOffset;
            }
            break;
        case 'right':
            if (this.x > 400){
                break;
            } else {
                this.x = this.x + xOffset;
            }
            break;
        default:
            break;
    }
};

var Gem = function(){
    this.sprite = 'images/gem-green.png';
    // these positions are estimates base on visual fiddling
    this.x = 10 + xOffset * 2;
    this.y = 25;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 101);
};

var genEnemies = function(row) {
    switch(row){
        case "top":
            var numEnemies = enemyRows.top.num;
            var topSpeed = enemyRows.top.speed;
            var startPosY = 60;
            for (var i=0; i<numEnemies; i++){
                var speed = topSpeed + Math.random() * 100 - 50;
                var startPosX = -xOffset - xOffset * i * 3;
                var newEnemy = new Enemy(speed, startPosX, startPosY);
                allEnemies.push(newEnemy);
            }
            break;
        case "middle":
            var numEnemies = enemyRows.middle.num;
            var middleSpeed = enemyRows.middle.speed;
            var startPosY = 60 + yOffset;
            for (var i=0; i<numEnemies; i++){
                var speed = middleSpeed + Math.random() * 100 - 50;
                var startPosX = -xOffset - xOffset * i * 3;
                var newEnemy = new Enemy(speed, startPosX, startPosY);
                allEnemies.push(newEnemy);
            }
            break;
        case "bottom":
            var numEnemies = enemyRows.bottom.num;
            var bottomSpeed = enemyRows.bottom.speed;
            var startPosY = 60 + yOffset * 2;
            for (var i=0; i<numEnemies; i++){
                var speed = bottomSpeed + Math.random() * 40 - 20;
                var startPosX = -xOffset - xOffset * i * 3;
                var newEnemy = new Enemy(speed, startPosX, startPosY);
                allEnemies.push(newEnemy);
            }
            break;
        default:
            break;
    }
};

// NOTE: our Player, Enemy, and Gem objects are instantiated in engine.js
// in the reset() function, which is called by init() and checkGemCapture()

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});