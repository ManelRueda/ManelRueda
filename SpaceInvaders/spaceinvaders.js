const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// SONIDOS
const enemyDeathSound = new Audio("MI BOMBA- Sound effect.mp3");
const playerHitSound = new Audio("Roblox Death Sound (Oof) - Sound Effect (HD).mp3");
const gameOverSound = new Audio("Pero mañana tú no tienes castigo (Clarence Meme) audio.mp3");
gameOverSound.volume = 0.5;

// CONFIGURACIÓN DEL PLAYER
const playerWidth = 50;
const playerHeight = 20;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerStep = 50;
let playerHealth = 100;

// BALAS DEL PLAYER
const bullets = [];
const bulletSpeed = 4;
const shotCooldown = 300;
let lastShotTime = 0;

// BALAS ENEMIGOS
const enemyBullets = [];
const enemyBulletSpeed = 3;
const enemyDamage = 5;
const enemyShootChance = 0.002;

// ENEMIGOS
const enemies = [];
const enemyRows = 4;
const enemyCols = 10;
const enemyPixelSize = 5;
const enemyPadding = 20;
const enemyOffsetTop = 50;
const enemyOffsetLeft = 50;
let enemyDirection = 1;
let enemyStep = 1;
const enemyDrop = 10;

// ANIMACIÓN DE ENEMIGOS
const alien1 = [
    [0,0,1,0,0,0,0,0,1,0,0],
    [0,0,0,1,0,0,0,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,1,1,1,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1],
    [0,0,0,1,1,0,1,1,0,0,0]
];
const alien2 = [
    [0,0,1,0,0,0,0,0,1,0,0],
    [1,0,0,1,0,0,0,1,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,1],
    [1,1,1,0,1,1,1,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,0,0,0,0,0,1,0,0],
    [0,1,0,0,0,0,0,0,0,1,0]
];

let currentAlien = alien1;
let lastAnimationTime = 0;
const animationInterval = 500;

// CREAR ENEMIGOS
for(let r=0;r<enemyRows;r++){
    enemies[r] = [];
    for(let c=0;c<enemyCols;c++){
        let x = c*(alien1[0].length*enemyPixelSize + enemyPadding)+enemyOffsetLeft;
        let y = r*(alien1.length*enemyPixelSize + enemyPadding)+enemyOffsetTop;
        enemies[r][c] = {x:x, y:y, status:1};
    }
}

// MOVIMIENTO DEL PLAYER
document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowRight" && playerX < canvas.width - playerWidth) playerX += playerStep;
    if(e.key==="ArrowLeft" && playerX > 0) playerX -= playerStep;
    if(e.key===" ") shoot();
});

// DISPARO PLAYER
function shoot(){
    const now = Date.now();
    if(now - lastShotTime > shotCooldown){
        bullets.push({x: playerX + playerWidth/2 - 2, y: playerY, width:4, height:10});
        lastShotTime = now;
    }
}

// DIBUJAR PLAYER
function drawPlayer(){
    ctx.fillStyle="lime";
    ctx.fillRect(playerX,playerY,playerWidth,playerHeight);
    ctx.fillStyle="red";
    ctx.fillRect(10,10, playerHealth*2, 10);
    ctx.strokeStyle="white";
    ctx.strokeRect(10,10, 200, 10);
}

// BALAS PLAYER
function drawBullets(){
    ctx.fillStyle="red";
    bullets.forEach((b,i)=>{
        ctx.fillRect(b.x,b.y,b.width,b.height);
        b.y -= bulletSpeed;
        if(b.y + b.height < 0) bullets.splice(i,1);
    });
}

// BALAS ENEMIGOS
function drawEnemyBullets(){
    ctx.fillStyle="yellow";
    enemyBullets.forEach((b,i)=>{
        ctx.fillRect(b.x,b.y,b.width,b.height);
        b.y += enemyBulletSpeed;
        if(b.y + b.height >= playerY &&
           b.x + b.width >= playerX &&
           b.x <= playerX + playerWidth){
            playerHealth -= enemyDamage;
            playerHitSound.currentTime = 0;
            playerHitSound.play();
            enemyBullets.splice(i,1);
        }
        if(b.y > canvas.height) enemyBullets.splice(i,1);
    });
}

// DIBUJAR ENEMIGOS
function drawEnemy(enemy){
    for(let i=0;i<currentAlien.length;i++){
        for(let j=0;j<currentAlien[i].length;j++){
            if(currentAlien[i][j]===1){
                ctx.fillStyle="white";
                ctx.fillRect(enemy.x + j*enemyPixelSize, enemy.y + i*enemyPixelSize, enemyPixelSize, enemyPixelSize);
            }
        }
    }
}

// ACTUALIZAR ENEMIGOS
function updateEnemies(){
    const now = Date.now();
    if(now - lastAnimationTime > animationInterval){
        currentAlien = (currentAlien===alien1)? alien2 : alien1;
        lastAnimationTime = now;
    }

    let hitEdge = false;
    for(let r=0;r<enemyRows;r++){
        for(let c=0;c<enemyCols;c++){
            const e = enemies[r][c];
            if(e.status===1){
                if((enemyDirection===1 && e.x + alien1[0].length*enemyPixelSize >= canvas.width) ||
                   (enemyDirection===-1 && e.x <=0)){
                    hitEdge = true;
                    break;
                }
            }
        }
        if(hitEdge) break;
    }

    if(hitEdge){
        enemyDirection *= -1;
        for(let r=0;r<enemyRows;r++){
            for(let c=0;c<enemyCols;c++){
                enemies[r][c].y += enemyDrop;
            }
        }
    }

    for(let r=0;r<enemyRows;r++){
        for(let c=0;c<enemyCols;c++){
            enemies[r][c].x += enemyDirection * enemyStep;
            if(enemies[r][c].status===1 && Math.random() < enemyShootChance){
                enemyBullets.push({x: enemies[r][c].x + 20, y: enemies[r][c].y + 40, width:4, height:10});
            }
        }
    }
}

// DIBUJAR TODOS LOS ENEMIGOS
function drawEnemies(){
    for(let r=0;r<enemyRows;r++){
        for(let c=0;c<enemyCols;c++){
            if(enemies[r][c].status===1) drawEnemy(enemies[r][c]);
        }
    }
}

// COLISIONES PLAYER-BALAS
function collisionDetection(){
    bullets.forEach((b,bIndex)=>{
        for(let r=0;r<enemyRows;r++){
            for(let c=0;c<enemyCols;c++){
                const e = enemies[r][c];
                if(e.status===1 &&
                   b.x < e.x + alien1[0].length*enemyPixelSize &&
                   b.x + b.width > e.x &&
                   b.y < e.y + alien1.length*enemyPixelSize &&
                   b.y + b.height > e.y){
                    e.status=0;
                    bullets.splice(bIndex,1);
                    enemyDeathSound.currentTime = 0;
                    enemyDeathSound.play();
                }
            }
        }
    });
}

// LOOP PRINCIPAL
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemyBullets();
    updateEnemies();
    drawEnemies();
    collisionDetection();

    if(playerHealth <= 0){
        gameOverSound.currentTime = 0;
        gameOverSound.play();
        ctx.fillStyle="red";
        ctx.font="50px monospace";
        ctx.textAlign="center";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);

        setTimeout(()=>{
            gameOverSound.pause();
            gameOverSound.currentTime = 0;
            document.location.reload();
        }, 4000);
        return;
    }

    requestAnimationFrame(draw);
}

draw();
