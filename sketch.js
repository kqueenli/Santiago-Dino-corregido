var PLAY=1;
var END=0;
var gameState=PLAY;

var score;

var trex, trex_running;
var ground,groundimg,invisibleground;
var cloud,cloudImg;
var obstacle,o1,o2,o3,o4,o5,o6;

function setup(){
    createCanvas(600,200);

    trex = createSprite(50,150,50,70);
    trex.addAnimation("running",trex_running);
    trex.scale=0.5 ;

    ground=createSprite(300,190,600,20);
    ground.addImage("ground",groundimg);
    ground.x=ground.width/2;

    invisibleground=createSprite(100,200,200,10);
    invisibleground.visible=false;

    score=0;
}

function preload(){  
    trex_running=loadAnimation("trex1.png" ,"trex3.png" ,"trex4.png");

    groundimg=loadImage("ground2.png");

    cloudImg=loadImage("cloud.png");

    o1=loadImage("obstacle1.png");
    o2=loadImage("obstacle2.png");
    o3=loadImage("obstacle3.png");
    o4=loadImage("obstacle4.png");
    o5=loadImage("obstacle5.png");
    o6=loadImage("obstacle6.png");

}

function draw(){
    background("white");

    text("Score "+score ,500,30) ;

    if(gameState === PLAY){
        //mover el suelo
        ground.velocityX = -4;
        //puntuación
        score = score + Math.round(frameCount/60);
        
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        
        //hacer que el Trex salte al presionar la barra espaciadora
        if(keyDown("space")&& trex.y >= 100) {
            trex.velocityY = -13;
        }
        
        //agregar gravedad
        trex.velocityY = trex.velocityY + 0.8
      
        //aparecer las nubes
        spawnClouds();
      
        //aparecer obstáculos en el suelo
        spawnObstacles();
            
        //evitar que el Trex caiga
        trex.collide(invisibleground);
    }
    else if(gameState === END){
        ground.velocityX = 0;
    }

drawSprites();
}
    
function spawnClouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(600,100,40,10);
        cloud.y = Math.round(random(10,60));
        cloud.addImage(cloudImg);
        cloud.scale = 0.4;
        cloud.velocityX = -3;
        cloud.lifetime=220 ;
    }
     
}

function spawnObstacles(){
    if (frameCount % 60 === 0) {   
    obstacle=createSprite(610,175,10,40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    var rand =Math.round(random(1,6));
    switch(rand){
        case 1: obstacle.addImage(o1);
        break;
        case 2: obstacle.addImage(o2);
        break;
        case 3: obstacle.addImage(o3);
        break;
        case 4: obstacle.addImage(o4);
        break;
        case 5: obstacle.addImage(o5);
        break;
        case 6: obstacle.addImage(o6);
        break;
        default: break;
    }
    }
}