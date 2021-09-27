var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "1";

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.75

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	
	//Crea el Suelo
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	//Engine.run(engine);

	var pos = packageBody.position;
	var angle = packageBody.angle;
	
	push();
	translate(pos.x,pos.y);
	rotate(angle);

	pop();
}


function draw() {
  Engine.update(engine);

  rectMode(CENTER);
  background(0);
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 


  //Matter.Body.translate(packageBody,{x:20,y:0});

  if(gameState === "1"){
 	 if(keyDown("LEFT_ARROW")){
		  helicopterSprite.x = helicopterSprite.x - 10;
		  Matter.Body.translate(packageBody,{x:-10,y:0});
 	 }

	if(keyDown("RIGHT_ARROW")){
		  helicopterSprite.x = helicopterSprite.x +10;
		  Matter.Body.translate(packageBody,{x:10,y:0});
  	}

 	 if(keyDown("DOWN_ARROW")){
		  Matter.Body.setStatic(packageBody,false);
		  gameState = "2";
 	 }
  }
  else if(gameState === "2"){
	if(keyDown("LEFT_ARROW")){
		helicopterSprite.x = helicopterSprite.x - 10;
	}

	if(keyDown("RIGHT_ARROW")){
		helicopterSprite.x = helicopterSprite.x +10;
	}
  }

	drawSprites();
}
