var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletImg;
var zombie, zombieImg;

var life
var gameState
var scores



function preload() {
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet.png")
  zombieImg = loadImage("assets/zombie.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 2;

  // Creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.setCollider("rectangle", 0, 0, 300, 300);
  zombieGroup = new Group();
  bulletGroup = new Group();
  heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    life = 3
    scores = 0

    gameState = "fight"

  


    

}

function draw() {
  background(0); 

  

  // Draw the sprites
  drawSprites();

  
  
  // Moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
  }

  // Release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    player.addImage(shooter_shooting);
    showBullet();
  }

  // Player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg);
  }

    
      
  if(zombieGroup.isTouching(bulletGroup)){
    // Destroy all zombies in the group
    for (var i = 0; i<zombieGroup.length; i++ ){
      if (zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        scores += 0.5;
      }
    }
    
    // Increment life by 1
  }
  
  if(zombieGroup.isTouching(player)){
    for(var i = 0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life -= 1;
      }
    }
  }
  
  
  if(life === 3){
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }
  
  textSize(80);
    fill("blue");
    text("Score:"+ scores, 300, 300);


  if(life === 2){
    // Hide the third heart and show the second heart
    heart3.visible = false;
    heart2.visible = true;
  }
  
  if(life === 1){
    // Hide the second heart and show the first heart
    heart2.visible = false;
    heart1.visible = true;
  }
  
  if(life === 0){
   gameState = "lost"; 
   heart1.visible = false;
  }
  
  
  if (gameState == "lost" ){
    player.destroy();
    zombieGroup.destroyEach();
    textSize(80);
    fill("blue");
    text("Game Over!", 300, 300);

  }

  spawnZombie();
}

function showBullet() {
  bullet = createSprite(player.x, player.y, 20, 20);
  bullet.addImage(bulletImg);
  bullet.scale = 0.14;
  bullet.velocityX = 6;
  bullet.lifetime = 800; 
  bulletGroup.add(bullet);
}


function spawnZombie(){
  
  if(frameCount%50===0){
    var rand2 = Math.round(random(1,windowHeight))
    //giving random x and y positions for zombie to appear
    zombie = createSprite(windowWidth - 50, rand2 / 2, 50, 50);

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 800
   zombieGroup.add(zombie)
  }

}
