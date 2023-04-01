const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight 

let money = 0
let kills = 0
//definiowanie postaci gracza
class Player {
    constructor(){
        this.position = {
            x: (innerWidth / 2) - 150,
            y: (innerHeight /2) - 50,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 80     
        this.health = 100;
        this.energy = 100;
        this.healthBarWidth = 50;
        this.healthBarHeight = 5;
        
    }
    
    draw(){
        // rysowanie gracza
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        // rysowanie paska życia
        c.fillStyle = 'red';
        c.fillRect(
            this.position.x + (this.width - this.healthBarWidth) / 2,
            this.position.y - this.healthBarHeight - 10,
            this.healthBarWidth * (this.health / 100),
            this.healthBarHeight
        );
        
        // rysowanie paska energii
        c.fillStyle = 'blue';
        c.fillRect(
            this.position.x + (this.width - this.healthBarWidth) / 2,
            this.position.y - this.healthBarHeight - 18,
            this.healthBarWidth * (this.energy / 100),
            this.healthBarHeight
        );
        //rysowanie napisu 
        c.fillStyle = "red";
        c.font = "bold 30px Arial";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(`Kills: ${kills}`, 75, 40);
        c.fillText(`Money: ${money}`, 80, 90);
        
    }
    
    update(){
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 
        
        if(player.energy < 100){
            player.energy += 0.2
        }
    }
}
class Shop {
  constructor(){
      this.position = {
          x: 500,
          y: 50,
      }
      this.velocity = {
          x: 0,
          y: 0
      }
      this.width = 200  
      this.height = 100     
  }
  
  draw(){
      // rysowanie sklepu
      c.fillStyle = 'yellow'
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
  
      //rysowanie napisu 
      c.fillStyle = "red";
      c.font = "bold 30px Arial";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText('Shop', this.position.x + 100, this.position.y + 50);
  }
  
  update(){
      this.draw()
      
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y 
  }
}

class Shot {
    constructor(x, y, targetX, targetY) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10
        this.active = true; // flaga aktywności pocisku
        // obliczamy wektor prędkości pocisku na podstawie pozycji myszki
        const dx = targetX - this.position.x;
        const dy = targetY - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.velocity.x = dx / distance * 18;
        this.velocity.y = dy / distance * 18;
    }

    draw() {
        // rysowanie strzału
        c.fillStyle = 'black';
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.width / 2, 0, 2 * Math.PI);
        c.fill();
    }

    update() {
        if (!this.active) return; // ignorujemy pociski z flagą aktywności na false
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    checkCollision(worms, rocks) {
        // iterujemy przez wszystkie robaki i sprawdzamy, czy strzał i robak mają ze sobą punkt wspólny
        for (let i = 0; i < worms.length; i++) {
            const worm = worms[i];
            if (touch(this, worm) && this.active === true){
                worm.healthBarWidth -= 20
                this.active = false
                if (worm.healthBarWidth <= 0) {
                    worms.splice(i, 1);
                    money += 5 
                    kills += 1
                }
                return;
            }
        }
        // iterujemy przez wszystkie skały i sprawdzamy, czy strzał i skała mają ze sobą punkt wspólny
        for (let i = 0; i < rocks.length; i++) {
            const rock = rocks[i];
            if (touch(this, rock) && this.active === true) {
                this.active = false;
                return;
            }
        }
    }
}

canvas.addEventListener('click', (event) => {
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    }
    const shot = new Shot(player.position.x +20 , player.position.y + 40, mousePosition.x, mousePosition.y)
    if(player.energy >= 20){
        shots.push(shot)
        player.energy -= 20
    }
});
//definiowanie robaka
class Worm{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
        this.health = 100;
        this.healthBarWidth = 50;
        this.healthBarHeight = 5;
        
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // rysowanie paska życia
        c.fillStyle = 'red';
        c.fillRect(
            this.position.x + (this.width - this.healthBarWidth) / 2,
            this.position.y - this.healthBarHeight - 10,
            this.healthBarWidth * (this.health / 100),
            this.healthBarHeight
        );
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    
}
//definiowanie skały
class Rock{
    constructor({x,y}){
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50
        this.height = 50
    }
    draw(){
        c.fillStyle = 'grey'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class Play{
    constructor(){
        this.position = {
            x: 500,
            y: 200,
        }
        this.width = 200
        this.height = 100
        this.isMouseOver = false; // flaga, czy myszka znajduje się nad blokiem
         // obsługa zdarzenia najechania myszką
        window.addEventListener('mousemove', (event) => {
            const mousePosition = {
                x: event.clientX,
                y: event.clientY
            }
            this.isMouseOver = this.isClicked(mousePosition);
        });
        
        // obsługa zdarzenia kliknięcia myszą
        window.addEventListener('click', (event) => {
            const mousePosition = {
                x: event.clientX,
                y: event.clientY
            }
            if (this.isClicked(mousePosition)) {
                start();
                this.width = 0;
            }
        });
    }
    // sprawdzenie, czy obiekt Player został kliknięty myszą
    isClicked(mousePosition) {
        return (
            mousePosition.x >= this.position.x &&
            mousePosition.x <= this.position.x + this.width &&
            mousePosition.y >= this.position.y &&
            mousePosition.y <= this.position.y + this.height
        );
    }
    
    draw(){
        // kolor tła bloku - szary lub ciemniejszy, gdy myszka jest nad blokiem
        const backgroundColor = this.isMouseOver ? "#6d4c41" : "#795548";
        
        // rysowanie bloku z marginesem
        c.fillStyle = backgroundColor;
        c.fillRect(this.position.x + 10, this.position.y + 10, this.width - 20, this.height - 20);
        
        // rysowanie napisu "graj" na środku bloku
        c.fillStyle = "white";
        c.font = "bold 30px Arial";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("Graj", this.position.x + this.width / 2, this.position.y + this.height / 2);
    }
    
    update(){
        this.draw()
    }
}
let player = new Player();
let shots = [new Shot({x: player.position.x, y: player.position.y})]
let worms = [new Worm({x: 750, y: 550}), new Worm({x: 400, y:200}), new Worm({x: 100, y:200}), new Worm({x: 400, y:600})]
let rocks = [new Rock({x: 800, y: 300 }), new Rock({x: 540, y: 210}),new Rock({x: 760, y:250}), new Rock({x: 100, y:25}),new Rock({x: 789, y:866}),new Rock({x: 99, y:259}), new Rock({x: 151, y:234}),new Rock({x: 523, y:510}),new Rock({x: 394, y:30}),new Rock({x: 939, y:1142}),new Rock({x: 163, y:652}),new Rock({x: 500, y:850}),new Rock({x: 500, y:50}),new Rock({x: 550, y:50}),new Rock({x: 600, y:50}),new Rock({x: 650, y:50}),new Rock({x: 500, y:100}),new Rock({x: 550, y:100}),new Rock({x: 600, y:100}),new Rock({x: 650, y:100}) ]
let shop = new Shop();
let play = new Play();

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}
//tworzenie animacji postaci 
function start(){
    requestAnimationFrame(start)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update() 
    // aktualizacja pozycji i rysowanie wszystkich strzałów
    for (let shot of shots) {
        shot.update();
        shot.checkCollision(worms, rocks);
      }
  // aktualizacja pozycji i rysowanie wszystkich robaków
  for (let worm of worms) {
    worm.update();
  }
  for (let rock of rocks) {
    rock.update();
  }
  shop.update()

    //klatka, w której porusza się gracz
    if (keys.right.pressed && player.position.x <= 700) {
        player.velocity.x = 5;
      } else if (keys.left.pressed && player.position.x >= 600) {
        player.velocity.x = -5;
      } else {
        player.velocity.x = 0;
      }
    
      if (keys.up.pressed && player.position.y >= 200) {
        player.velocity.y = -5;
      } else if (keys.down.pressed && player.position.y <= 300) {
        player.velocity.y = 5;
      } else {
        player.velocity.y = 0;
      }
    
    //jeśli dojdzie do jej granicy to się zatrzymuje, a w jego strone poruszają się wszystkie napotykane przedmioty:
    
      // Update velocities of rocks and worms based on player position
      for (let rock of rocks) {
        if (keys.right.pressed && player.velocity.x === 0) {
          rock.velocity.x = -5;
        } else if (keys.left.pressed && player.velocity.x === 0) {
          rock.velocity.x = 5;
        } else {
          rock.velocity.x = 0;
        }
    
        if (keys.up.pressed && player.velocity.y === 0) {
          rock.velocity.y = 5;
        } else if (keys.down.pressed && player.velocity.y === 0) {
          rock.velocity.y = -5;
        }  else rock.velocity.y = 0

      }
      for (let shot of shots) {
        if (keys.right.pressed && player.velocity.x === 0) {
          shot.position.x -= 5;
        } else if (keys.left.pressed && player.velocity.x === 0) {
          shot.position.x += 5;
        } 

    
        if (keys.up.pressed && player.velocity.y === 0) {
            shot.position.y += 5;
        } else if (keys.down.pressed && player.velocity.y === 0) {
            shot.position.y -= 5;
        }
      }
      if (keys.right.pressed && player.velocity.x === 0) {
        shop.velocity.x = -5;
      } else if (keys.left.pressed && player.velocity.x === 0) {
        shop.velocity.x = 5;
      } else {
        shop.velocity.x = 0;
      }
  
      if (keys.up.pressed && player.velocity.y === 0) {
        shop.velocity.y = 5;
      } else if (keys.down.pressed && player.velocity.y === 0) {
        shop.velocity.y = -5;
      }  else shop.velocity.y = 0

      for (let worm of worms) {
        if (keys.right.pressed && player.velocity.x === 0) {
          worm.velocity.x = -5;
        } else if (keys.left.pressed && player.velocity.x === 0) {
          worm.velocity.x = 5;
        } else {
          worm.velocity.x = 0;
        }
        
        if (keys.up.pressed && player.velocity.y === 0) {
          worm.velocity.y = 5;
        } else if (keys.down.pressed && player.velocity.y === 0) {
          worm.velocity.y = -5;
        } else {
          worm.velocity.y = 0;
        }
        
        if(player.position.x >= worm.position.x){
            worm.position.x += 2
        }if(player.position.x <= worm.position.x){
            worm.position.x -= 2
        }if(player.position.y >= worm.position.y){
            worm.position.y += 2
        }if(player.position.y <= worm.position.y){
            worm.position.y -= 2
      }
        if(touch(player, worm) && player.health > 0){
            player.health -= 0.5
        }
    }
    
        // jeżeli spotkam na swojej drodze kamień, to się zatrzymuje:
        rocks.forEach(rock => {

        if(touchLeftBorder(player, rock) && keys.left.pressed === false){
            player.velocity.x = 0
            rocks.forEach(rock => {
                rock.velocity.x = 0
            })
            worms.forEach(worm => {
                worm.velocity.x = 0
            })
            shop.velocity.x = 0
        }if(touchRightBorder(player, rock) && keys.right.pressed === false){
            player.velocity.x = 0
            rocks.forEach(rock => {
                rock.velocity.x = 0
            })
            worms.forEach(worm => {
                worm.velocity.x = 0
            })
            shop.velocity.x = 0
        }if(touchUpperBorder(player, rock) && keys.up.pressed === false){
            player.velocity.y = 0
            rocks.forEach(rock => {
                rock.velocity.y = 0
            })
            worms.forEach(worm => {
                worm.velocity.y = 0
            })
            shop.velocity.y = 0
        }else if(touchBottomBorder(player, rock) && keys.down.pressed === false){
            player.velocity.y = 0
            rocks.forEach(rock => {
                rock.velocity.y = 0
            })
            worms.forEach(worm => {
                worm.velocity.y = 0
            })
            shop.velocity.y = 0
        }
    })
    
//dodanie reakcji programu na klikane klawisze (W, A, S, D)
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
       case 65:
           keys.left.pressed = true
           break

       case 83:
           keys.down.pressed = true
           break

       case 68:
           keys.right.pressed = true
           break
           
       case 87:
           keys.up.pressed = true
           break
    }
});
}
//tworzenie napisu graj na środku oraz wywołanie funkcji start po jego kliknięciu
function opening(){
    requestAnimationFrame(opening)
    c.clearRect(0, 0, canvas.width, canvas.height)
    play.update()
}

//dodanie reakcji programu na zaprzestanie trzymania klawiszy WASD
addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
       case 65:
           keys.left.pressed = false
           break

       case 83:
           keys.down.pressed = false
           break

       case 68:
           keys.right.pressed = false
           break
           
       case 87:
           keys.up.pressed = false
           break
    }
});

//funkcje zderzenia
function touchLeftBorder(a, b) {
    if (a.position.x + a.width < b.position.x && a.position.x + a.width + 5 >= b.position.x && a.position.y + a.height >= b.position.y && a.position.y <= b.position.y + b.height) {
        return true;
    }
    return false;
}
function touchRightBorder(a, b) {
    if (a.position.x > b.position.x + b.width && a.position.x - 5 <= b.position.x + b.width && a.position.y + a.height >= b.position.y && a.position.y <= b.position.y + b.height) {
        return true;
    }
    return false;
}
function touchUpperBorder(a, b) {
    if (a.position.y + a.height < b.position.y && a.position.y + a.height + 5 >= b.position.y && a.position.x + a.width >= b.position.x && a.position.x <= b.position.x + b.width) {
        return true;
    }
    return false;
}
function touchBottomBorder(a, b) {
    if (a.position.y > b.position.y + b.height && a.position.y - 5 <= b.position.y + b.height && a.position.x + a.width >= b.position.x && a.position.x <= b.position.x + b.width) {
        return true;
    }
    return false;
}
function touch(a,b) {
    if(
        a.position.x >= b.position.x &&
        a.position.x <= b.position.x + b.width &&
        a.position.y >= b.position.y &&
        a.position.y <= b.position.y + b.height){
        return true;
    }return false;
}
//uruchomienie programu


opening()