const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
var engine, world, ground;
var jumping_animations = [];
var standing_img = [];
var mx = 5, my = 5;
var electro_life = true, goblin_life = true, ock_life = true;





function preload() 
{
  jumping_animations = [loadImage("assets/spiderman10.png"),loadImage("assets/spiderman1.png"),loadImage("assets/spiderman2.png"),loadImage("assets/spiderman3.png"),loadImage("assets/spiderman4.png"),loadImage("assets/spiderman5.png"),loadImage("assets/spiderman6.png"),loadImage("assets/spiderman7.png"),loadImage("assets/spiderman8.png"),loadImage("assets/spiderman9.png"),loadImage("assets/spiderman10.png")];
  standing_img = [loadImage("assets/spiderman10.png")];
  city_back = loadImage("assets/citybackground.jpg");
  goblin_img = loadImage("assets/goblin.png");
  ock_img = loadImage("assets/ock.png");
  electro_img = loadImage("assets/electro.png");
}

function printMouse(event)
{
  //document.body.textContent = "clientX: "+event.clientX+"- clientY: "+event.clientY;
  mx = event.clientX;
  my = event.clientY;
  console.log(mx,my);
}

function setup() {

  createCanvas(windowWidth, windowHeight-5);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(windowWidth/2, windowHeight-10, windowWidth*3, 5, "black");


 // hand = Bodies.circle(50,height-250,20);
  //World.add(world,hand);

  spiderman = new Spiderman(50,height-300,standing_img);

  villain1 = createSprite(width/2+200,height-100,10,10);
  villain1.addImage(goblin_img);
  villain1.scale = 0.65;
  villain1.velocityX = -2.5;

  villain2 = createSprite(width/2+700,height-130,10,10);
  villain2.addImage(ock_img);
  villain2.scale = 0.22;
  villain2.velocityX = -1.6;

  villain3 = createSprite(width/2-300,height-100,10,10);
  villain3.addImage(electro_img);
  villain3.scale = 0.22;
  villain3.velocityX = -2.2;

  block1 = new Ground(222,270,100,20,"black");
  block2 = new Ground(445,200,110,10,"black");
  block3 = new Ground(670,250,150,10,"black");
  block4 = new Ground(975,210,90,10,"black");

  b1x = range(block1.x-50,block1.x+50);
  b1y = range(block1.y-10,block1.y+10);
  b2x = range(block2.x-55,block2.x+55);
  b2y = range(block2.y-5,block2.x+5);
  b3x = range(block3.x-75,block3.x+75);
  b3y = range(block3.y-5,block3.x+5);
  b4x = range(block4.x-45,block4.x+45);
  b4y = range(block4.y-5,block4.x+5);

  /*const render = Matter.Render.create({
    element: document.body,
    engine: engine,
  });
  const mouseConstraint = Matter.MouseConstraint.create(
    engine, {element: document.body}
  );
  const runner = Matter.Runner.create();
  Matter.Events.on(runner, "tick", event => {
    if (mouseConstraint.body) {
      link1 = new Link(spiderman.body,mouseConstraint.body);
      console.log(mouseConstraint.body);
      //alert("message");
    }
  });
  // also possible, testing the condition on mousedown only:
  //Matter.Events.on(mouseConstraint, "mousedown", () => {
  //  if (mouseConstraint.body) {
  //    Matter.Composite.remove(engine.world, mouseConstraint.body);
  //  }
  //});
  Matter.Runner.start(runner, engine);
  Matter.Render.run(render);
//link2 = new Link(spiderman.body,block1.body);*/
}

function draw() {
  background("red");
  Engine.update(engine);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  image(city_back,width/2,height/2,width,height);
  document.addEventListener("click",printMouse,true);
  ground.display();
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  spiderman.display();
  spiderman.animate();
  if (keyIsDown(UP_ARROW))
  {
    spiderman.jump();
    console.log("1");
    spiderman.display();
  }
  //block1
  if (mx > b1x[0] && mx < b1x[b1x.length-1] && my > b1y[0] && my < b1y[b1y.length-1])
  {
    if (web2) web2.detatch();
    if (web3) web3.detatch();
    if (web4) web4.detatch();
    var web1 = new Link(spiderman.body,block1.body);
    web1.display();
  }
  //block2
  if (mx > b2x[0] && mx < b2x[b2x.length-1] && my > b2y[0] && my < b2y[b2y.length-1])
  {
    if (web1) web1.detatch();
    if (web3) web3.detatch();
    if (web4) web4.detatch();
    var web2 = new Link(spiderman.body,block2.body);
    web2.display();
  }
  //block3
  if (mx > b3x[0] && mx < b3x[b3x.length-1] && my > b3y[0] && my < b3y[b3y.length-1])
  {
    if (web2) web2.detatch();
    if (web1) web1.detatch();
    if (web4) web4.detatch();
    var web3 = new Link(spiderman.body,block3.body);
    web3.display();
  }
  //block4
  if (mx > b4x[0] && mx < b4x[b4x.length-1] && my > b4y[0] && my < b4y[b4y.length-1])
  {
    if (web2) web2.detatch();
    if (web3) web3.detatch();
    if (web1) web1.detatch();
    var web4 = new Link(spiderman.body,block4.body);
    web4.display();
  }
  if (villain1.x < width/2-100)
  {
    villain1.velocityX = 2.5;
  }
  if (villain2.x < width/2+400)
  {
    villain2.velocityX = 1.6;
  }
  if (villain3.x < width/2-600)
  {
    villain3.velocityX = 2.2;
  }

  if (villain1.x > width/2+200)
  {
    villain1.velocityX = -2.5;
  }
  if (villain2.x > width/2+700)
  {
    villain2.velocityX = -1.6;
  }
  if (villain3.x > width/2-300)
  {
    villain3.velocityX = -2.2;
  }
  /*for(var j = 0; j < b1x.length-1; j++)
  {
    if (mx == b1x[j])
    {
      console.log("test");
    }
  }*/

  //if (mx == 270)
  //{
    //alert("Block1");
    //console.log("test");
  //}
  //if (link1 != null){
    //link1.display();
  //}
  //link2.display();
  drawSprites();
}


function keyPressed()
{
  if (keyCode == 32)
  {
    Matter.Body.applyForce(spiderman.body,{x:0,y:0},{x:0.5,y:0.3});
    console.log("a");
  }
}

function keyReleased()
{

}

function range(s,e)
{
  var a = [];
  for (var i = s; i <= e; i++)
  {
    a.push(i);
  }
  return a;
}

