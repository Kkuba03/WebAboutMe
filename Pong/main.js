$(window).ready(function(){
    
});
class Screen{
    init(cnv){
        this.canvas = cnv;
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    get FPS(){
        return 60;
    }
    w(){
        return this.canvas.width;
    }
    h(){ 
        return this.canvas.height;
    }
}

class Player{
    init(){
        this.w = 20;
        this.h = 150;

        this.x = 0;
        this.y = s.h() / 2;
    }

    update(){
        s.ctx.fillStyle = "black";
        s.ctx.fillRect(this.x, this.y, this.w, this.h);

        if(keys[87] && this.y > 0){ // W
            this.y -= this.speed;
        }
        if(keys[83] && this.y < s.h() - this.h){ // S
            this.y += this.speed;
        }
        
    }
    get speed(){
        return 10;
    }
}
class Enemy{
    init(){
        this.w = 20;
        this.h = 150;

        this.x = s.w()-this.w;
        this.y = s.h()/2; 
    }

    update(){
        s.ctx.fillStyle = "black";
        s.ctx.fillRect(this.x, this.y, this.w, this.h);

        if(this.y+this.h/2  > ball.y && this.y > 0){
            this.y -= this.speed;               
        }
        if(this.y+this.h/2  < ball.y && this.y < s.h() - this.h){
            this.y += this.speed;
    
        
    }
}
    get speed(){
        return spd;
    }
}

class Ball {
    
    init() {
        this.x = (s.w() / 2) - 40;
        this.y = Math.floor(Math.random() * (s.h()));
        this.r = 20;
    }

    update() {
        s.ctx.fillStyle = "black";
        s.ctx.beginPath();
        s.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        s.ctx.fill();


        this.x -= xSpeed;
        this.y -= ySpeed;
        
        
        if(this.y < 0 || this.y > s.h()) {
            ySpeed = -ySpeed;
        }
        if(hit(player, ball)){
            xSpeed = -xSpeed*1.04;
            ySpeed = ySpeed*1.04;
            hitPlayer = true
            
            }
        if(hit(enemy, ball)){
            xSpeed = -xSpeed*1.04;
            ySpeed = ySpeed*1.04;
            hitPlayer = false
            }
        if (this.x < -10) {
            over = true; //player 1 loses
            $("body").append("<div style='text-align: center; width: 100%; color: red; font-size: 2.0vw; font-family: consolas; position: absolute; top: 2%; left: 0;'>Game Over (Player 1 lost the game)</div>");
            winScore += 1
        }
        if (this.x > s.w()+10) {
            over = true; //player 2 loses
            loseCount += 1
            $("body").append("<div style='text-align: center; width: 100%; color: red; font-size: 2.0vw; font-family: consolas; position: absolute; top: 2%; left: 0;'>Game Over (Player 2 lost the game)</div>");
        
        }
        /*$("#winScore").html("winScore: " + winScore);   na przyszłość jakbym chciał dodać punkty: Wkleić to do Body:
        <div id="loseScore" style="position: fixed; right: 1%; top: 2%; font-size: 1.5vw; font-family: consolas;"></div>
		<div id="winScore" style="position: fixed; right: 1%; top: 2%; font-size: 1.5vw; font-family: consolas;"></div>	*/
    }
}

function start(){
    s.init(document.getElementById("game"));
    player.init();
    enemy.init();
    ball.init();

    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });
}

let s = new Screen();
let player = new Player();
let enemy = new Enemy();
let ball = new Ball();
let keys = [];
let mouse = [];
let over = false;
let xSpeed;
let ySpeed;
let spd;
let hitPlayer = false
let hitUp = false


function update(){
    if(over)
        return false; // stop the game

    setTimeout(function(){
        update();  
    }, 1000 / s.FPS);

    // update

    s.ctx.clearRect(0, 0, s.w(), s.h());
    player.update();
    enemy.update();
    ball.update();
}
window.onresize = function(){
/*kod*/
}

function hit(a, b) {
    if (a.x + a.w > b.x && a.x < b.x + b.r && a.y + a.h > b.y && a.y < b.y + b.r) {
        return true;
    }
    return false;
}
function remove(){
    buttons = document.getElementsByTagName("button");while (buttons.length > 0) {
    while (buttons.length > 0) {
    buttons[0].remove();
    }
}
}
function easyGame(){
    document.getElementById("easy").innerHTML
    remove()
    spd = 7
    xSpeed = 7;
    ySpeed = 7;
    start();
    update();
} 
function normalGame(){
    document.getElementById("normal").innerHTML
    remove()
    spd = 18
    xSpeed = 9;
    ySpeed = 9;
    start();
    update();
}
function hardGame(){
    document.getElementById("hard").innerHTML
    remove()
    spd = 30
    xSpeed = 12;
     ySpeed = 12;
    start();
    update();
}