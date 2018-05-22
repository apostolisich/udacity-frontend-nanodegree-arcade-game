//TODO: Add collectibles, each of which will grant the user 10 points

let score = 0;
// The Enemy class constructor. This is going to be used in order 
// to create the enemy objects. It sets the sprite and takes
// the x, y and speed parameters.
class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png',
        this.x = x,
        this.y = y,
        this.speed = speed
    }

   // This function is responsible for moving the enemies on the canvas 
   // and checks for collision with the player object.
    update (dt) {
        if(this.x >= 500) {
            this.x = -100;
        }else {
            this.x += (1 * this.speed);
        }
    }
    // This functions renders the image on the canvas.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// The Player class constructor. This is going to be used in order 
// to create the player object. It sets the sprite and takes
// the x and y parameters.
class Player {
    constructor (x, y) {
        this.sprite = 'images/char-boy.png',
        this.x = x,
        this.y = y
    }

    // An update function needed to view the sprite in the canvas
    // I didn't implement any functionality in it but I kept it
    // because otherwise the code wasn't working.
    update (dt) {
        
    }

    // This functions renders the sprite.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // This function handles the key input of the user and depending
    // on the users selection, it moves the player on the field
    // making sure that it doesn't go over the edges and also not
    // inside the water.
    handleInput(direction) {
        if (direction == 'left' && this.x - 101 >= 0){
            this.x -= 101;
        } else if (direction == 'right' && this.x + 101 <= 500) {
            this.x += 101;
        } else if (direction == 'up') {
            if(this.y - 85 <= 0){
                checkForCompletion();
                this.x = 202;
                this.y = 390;
            } else {
                this.y -= 85;
            }
        } else if (direction == 'down' && this.y + 85 <= 450) {
            this.y += 85;
        }
    }
}

// Below we instantiate our objects.
// All the enemies are placed in the allEmenies array
let player = new Player(202, 390);
// x: 0, 101, 202, 303, 404
// y: 50, 135, 220, 305, 390
let allEnemies = [];

let enemy1 = new Enemy(-90, 135, 5.1);
let enemy2 = new Enemy(0, 220, 6);
let enemy3 = new Enemy(40, 50, 3.5);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Listener for the restart button. When it is clicked then the page is
// reloaded and the game is restarted.
document.getElementById('restart-btn').addEventListener('click', function (){
    location.reload();
});

function checkForCompletion() {
    if(score + 15 >= 100) {
        document.getElementsByTagName('canvas')[0].setAttribute('style', 'visibility: hidden');
        document.getElementById('score-p').style.display = 'none';
        document.getElementById('success').style.display = 'block';
    }else{
        score += 15;
        document.getElementById('score-counter').innerHTML = score;
    }
}

// This functon checks for collision between the player and the enemies.
// We only have 3 enemies and 1 player which means that we don't have to
// create a more optimized solution.
setInterval(
    function () {
        allEnemies.forEach(function(enemy){
            if(enemy.x + 50 >= player.x && enemy.x + 50 <= player.x + 100 && enemy.y == player.y) {
                player.x = 202;
                player.y = 390;
                score = score - 15 > 0 ? score -= 15 : 0;
                document.getElementById('score-counter').innerHTML = score;
            }
        });
    }
, 100);