const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let protection = false
let marioLvl = 1
let over = false
let color = "red"
let colorSupBox = 'yellow'
let grzyb = false
let grzybEaten = false
let growing = false
const gravity = 1
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
            this.width = 50
            this.height = 50

    }

    draw(){
        c.fillStyle = color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
        this.velocity.y += gravity
        }
    }
}
class Mushroom{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 45
        this.height = 45
    }
    draw(){
        c.fillStyle = '#ff00015d'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class SupriseBox{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 50
        this.height = 50
    }
    draw(){
        c.fillStyle = colorSupBox
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Wood{
    constructor({x,y}){
        this.position = {
            x,
            y
        }
        this.width = 50
        this.height = 50
    }
    draw(){
        c.fillStyle = 'brown'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Platform{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 400
        this.height = 60
    }
    draw(){
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Worm{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 50
        this.height = 50
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
}
let player = new Player()
let platforms = [new Platform({x: 0, y: 600}), new Platform({x: 600, y: 600}), new Platform({x: 1000, y: 600}), new Platform({x: 1400, y: 600}), new Platform({x: 2000, y: 600}), new Platform({x: 3500, y: 600}),new Platform({x: 3900, y: 600}),new Platform({x: 4300, y: 600}),new Platform({x: 4700, y: 600}),new Platform({x: 5100, y: 600}),]
let worms = [new Worm({x: 750, y: 550}), new Worm({x: 1250, y: 550}), new Worm({x: 1750, y: 550}), new Worm({x: 2200, y: 5650})]
let woods = [new Wood({x: 800, y: 300 }), new Wood({x: 850, y: 300 }),new Wood({x: 950, y: 300 }), new Wood({x: 1000, y: 300 }), new Wood({x: 1600, y: 300 }), new Wood({x: 1650, y: 300 }), new Wood({x: 1700, y: 300 }), new Wood({x: 1750, y: 300 }),new Wood({x: 1800, y: 300 }), new Wood({x: 1850, y: 300 }),new Wood({x: 2300, y: 350 }),new Wood({x: 2350, y: 350 }),new Wood({x: 2650, y: 400 }),new Wood({x: 2700, y: 400 }),new Wood({x: 2750, y: 300 }),new Wood({x: 2800, y: 300 }),new Wood({x: 2850, y: 300 }),new Wood({x: 3250, y: 300 }),new Wood({x: 3300, y: 300 }),new Wood({x: 3350, y: 300 }),new Wood({x: 3200, y: 300 }),new Wood({x: 3150, y: 300 }),new Wood({x: 3100, y: 300 }),new Wood({x: 3050, y: 300 }),]
let supriseBoxes = [new SupriseBox({x: 900, y: 300 })]
let mushrooms = [new Mushroom({x: 902.5, y: 302.5})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}
let scrollOffset = 0
function init(){
player = new Player()
platforms = [new Platform({x: 0, y: 600}), new Platform({x: 600, y: 600}), new Platform({x: 1000, y: 600}), new Platform({x: 1400, y: 600}), new Platform({x: 2000, y: 600}), new Platform({x: 3500, y: 600}),new Platform({x: 3900, y: 600}),new Platform({x: 4300, y: 600}),new Platform({x: 4700, y: 600}),new Platform({x: 5100, y: 600}),]
worms = [new Worm({x: 750, y: 550}), new Worm({x: 1250, y: 550}), new Worm({x: 1750, y: 550}), new Worm({x: 2200, y: 5650})]
woods = [new Wood({x: 800, y: 300 }), new Wood({x: 850, y: 300 }),new Wood({x: 950, y: 300 }), new Wood({x: 1000, y: 300 }), new Wood({x: 1600, y: 300 }), new Wood({x: 1650, y: 300 }), new Wood({x: 1700, y: 300 }), new Wood({x: 1750, y: 300 }),new Wood({x: 1800, y: 300 }), new Wood({x: 1850, y: 300 }),new Wood({x: 2300, y: 350 }),new Wood({x: 2350, y: 350 }),new Wood({x: 2650, y: 400 }),new Wood({x: 2700, y: 400 }),new Wood({x: 2750, y: 250 }),new Wood({x: 2800, y: 250 }),new Wood({x: 2850, y: 200 }),new Wood({x: 3250, y: 300 }),new Wood({x: 3300, y: 300 }),new Wood({x: 3350, y: 300 }),new Wood({x: 3200, y: 300 }),new Wood({x: 3150, y: 300 }),new Wood({x: 3100, y: 300 }),new Wood({x: 3050, y: 300 }),]
supriseBoxes = [new SupriseBox({x: 900, y: 300 })]
mushrooms = [new Mushroom({x: 902.5, y: 302.5})]
protection = false
marioLvl = 1
over = false
color = "red"
colorSupBox = 'yellow'
grzyb = false
grzybEaten = false
growing = false
scrollOffset = 0
} 

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    worms.forEach(worm =>{
        worm.draw()
    })
    woods.forEach(wood =>{
        wood.draw()
    })
    supriseBoxes.forEach(SupriseBox =>{
        SupriseBox.draw()
        if(grzyb && !grzybEaten){
            mushrooms.forEach(Mushroom =>{
                Mushroom.draw()
                SupriseBox.draw()
                Mushroom.position.y -= 1
                if(player.position.y + player.height >= Mushroom.position.y && player.position.y <= Mushroom.position.y + Mushroom.height && player.position.x + player.width >= Mushroom.position.x && player.position.x <= Mushroom.position.x + Mushroom.width){
                    marioLvl += 1
                    player.position.y -= 50
                    grzybEaten = true
                    Mushroom.position.y = 800
                    growing = true
                    setTimeout(() => {growing = false}, 1000)
                    if(marioLvl > 1){
                        player.height = 100
                    }if(growing){
                        setInterval(() => {
                        if(color === 'red' && growing){
                            color = "yellow"
                        }else{
                            color = "red"
                        }
                    }, 100); 
                    }

                }
        })
    }
    })
    

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x >100) {
        player.velocity.x = -5
    }else player.velocity.x = 0 
    
    if(keys.right.pressed && player.velocity.x === 0){
        platforms.forEach(platform => {
            platform.position.x -= 5
        })
        worms.forEach(worm => {
            worm.position.x -= 5
        })
        woods.forEach(wood => {
            wood.position.x -= 5
        })
        supriseBoxes.forEach(SupriseBox =>{
            SupriseBox.position.x -= 5
        })
        mushrooms.forEach(Mushroom =>{
            Mushroom.position.x -= 5
        })
    }else if(keys.left.pressed && player.velocity.x === 0){
        platforms.forEach(platform => {
            platform.position.x += 5
        })
        worms.forEach(worm => {
            worm.position.x += 5
        })
        woods.forEach(wood => {
            wood.position.x += 5
        })
        supriseBoxes.forEach(SupriseBox =>{
            SupriseBox.position.x += 5
        })
        mushrooms.forEach(Mushroom =>{
            Mushroom.position.x += 5
        })
    }
    //kolizja z plaformą
    platforms.forEach(platform => {
    if(touchUpperBorder(player, platform)){
        player.velocity.y = 0
    }else if(touchFlankBorder(player, platform)){
        player.velocity.x = 0
    }
    if(player.position.y > canvas.height){
        init()
    }
    })
    //kolizja z drewnem
    woods.forEach(wood => {
        if(touchUpperBorder(player, wood)){
            player.velocity.y = 0
        }else if(touchBottomBorder(player, wood)){
            player.velocity.y = 0
            wood.position.y = 800
        }else if(touchFlankBorder(player, wood)){
            player.velocity.x = 0
        }
    })
    //kolizja z supriseBoxem
    supriseBoxes.forEach(SupriseBox => {
        if(touchUpperBorder(player, SupriseBox)){
            player.velocity.y = 0
        }else if(touchBottomBorder(player, SupriseBox)){
            player.velocity.y = 0
            colorSupBox = 'white'
            setTimeout(() => {grzyb = true}, 200)
        }else if(touchFlankBorder(player, SupriseBox)){
            player.velocity.x = 0
        }
    })

    //kolizja z robakiem
    worms.forEach(worm =>{
        if(touchUpperBorder(player, worm)){
            worm.height = 5
            worm.position.y = 595
            setTimeout(() => {worm.height = 0}, 2000)
        }else if(worm.position.x + worm.width >= player.position.x && player.position.x + player.width >= worm.position.x && worm.position.y + worm.height >= player.position.y - 20 && player.position.y + player.height >= worm.position.y + 20 && protection === false){
            marioLvl -= 1 
            console.log(marioLvl)
            protection = true
            if(marioLvl < 1){
                init()
            }else if(marioLvl === 1){
                player.height = 50
                setTimeout(() => {protection = false}, 2000)
            }else if(marioLvl === 2){
                player.height = 100
                setTimeout(() => {protection = false}, 2000)
            }else{
                over = true
            }if(protection){
                setInterval(() => {
                if(color === 'red' && protection){
                    color = "yellow"
                }else{
                    color = "red"
                }
            }, 100); 
            }
        } 
        // poruszanie sie robaka
        if(player.position.x + player.width + 500 > worm.position.x && player.position.x + player.width < worm.position.x && worm.height === 50){
            worm.position.x -= 2
        }else if(player.position.x - 500 < worm.position.x + worm.width && player.position.x > worm.position.x + worm.width && worm.height === 50){
            worm.position.x += 2
        }
        
    })
}


addEventListener('keydown', ({keyCode}) => {
     switch(keyCode){
        case 65:
            keys.left.pressed = true
            break

        case 83:
            break

        case 68:
            keys.right.pressed = true
            break
            
        case 87:
            player.velocity.y -= 25
            break
     }
});

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
       case 65:
           keys.left.pressed = false
           break

       case 83:
           break

       case 68:
           keys.right.pressed = false
           break
           
       case 87:
           break
    }
});

function touchUpperBorder(a, b) {
    if (a.position.y + a.height <= b.position.y && a.position.y + a.height + a.velocity.y >= b.position.y && a.position.x + a.width >= b.position.x && a.position.y + a.height + a.velocity.y >= b.position.y && a.position.x <= b.position.x + b.width) {
        return true;
    }
    return false;
}
function touchBottomBorder(a, b) {
    if (a.position.y + a.height >= b.position.y && a.position.y + a.velocity.y + 10 <= b.position.y + b.height && a.position.x + a.width >= b.position.x && a.position.y + a.height + a.velocity.y >= b.position.y && a.position.x <= b.position.x + b.width) {
        return true;
    }
    return false;
}
function touchFlankBorder(a, b) {
    if (((a.position.x + a.width <= b.position.x && a.position.x + a.width + a.velocity.x >= b.position.x) || (a.position.x >= b.position.x + b.height && a.position.x + a.velocity.x + 10 <= b.position.x + b.height)) && a.position.y <= b.position.y + b.height && a.position.y + a.height >= b.position.y) {
        return true;
    }
    return false;
}
animate()
