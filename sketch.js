var backgroundImage, player, playerImage, groundImage, ground, cat, catImage
var jumpCounter=0, jumpForce=25, p=1
var score=0
function preload() {
  backgroundImage = loadImage("background.jpg")
  playerImage = loadAnimation("player-removebg-preview.png")
  groundImage = loadImage("cliff.png")
  catImage = loadImage("object.png")
  }  

function setup() {
  createCanvas(1200, 800);
  player = createSprite(50, 430, 50, 50);
  player.addAnimation("p",playerImage)
  //player.debug=true
  player.scale = 0.4
  player.setCollider("rectangle", 0, 0, 300, 500)
 groundGroup=createGroup()
 catGroup=createGroup()
}

function draw() {
  background(backgroundImage);  
  
  
  if(keyDown(UP_ARROW)){
    player.velocityY=-9
   /* jumpCounter=jumpCounter+1
    if(jumpCounter>jumpForce){
      player.velocityY=7
    }*/}
    player.velocityY=player.velocityY+1
  
  if(keyDown(LEFT_ARROW)){
    player.x=player.x-10
  }
  if(keyDown(RIGHT_ARROW)){
    player.x=player.x+10
  }
  //if(player.velocityY===0&&player.isTouching(ground)){
  //  jumpCounter=0
  //}
  player.collide(groundGroup)
 // camera.position.x=player.position.x+300

 if(player.isTouching(catGroup)){
   catGroup[0].destroy()
   score=score+1
 }
  platforms();
  drawSprites();
  textSize(30)
  fill("black")
  text("score "+score, 1060, 50)
  
}

function platforms(){
if(frameCount%180===0){
  ground = createSprite(1200, 100, 300, 40)
  cat = createSprite(1200, 50, 300, 40)
  cat.scale=0.2
  cat.addImage("p", catImage)
  ground.addImage("l", groundImage)
  //ground.debug=true
  ground.setCollider("rectangle", 0, 0, 200, 70)
  ground.velocityX=-3
  cat.velocityX=-3
  ground.y=Math.round(random(200,500))
  cat.y = ground.y-40
  //player.collide(ground)
  groundGroup.add(ground)
  catGroup.add(cat)
  console.log(player.depth)
  console.log(ground.depth)
  ground.depth=player.depth
  player.depth=player.depth+1
  cat.lifetime=1000
  ground.lifetime=1000
}
}