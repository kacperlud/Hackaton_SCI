let game;
let testimg;
let textures = [];
let textureData;
let camera;
function preload()
{
  textures["test"]=loadImage("graphics/klatki.png");
  textures["grinch"]=loadImage("graphics/grinch.png");
  textures["boxy"]=loadImage("graphics/boxy3.png");
  textures["birb"]=loadImage("graphics/birb.png");
  textureData = loadJSON("graphics/textures.json");
}
function setup()
{
  rectMode(CENTER);
  imageMode(CENTER);
  createCanvas(900,600);
  camera = new Camera();
  game = new Game();
  game.play();
}

function draw()
{
  background(51);
  //camera.follow(game.GameObjects[0].body);
  test();
  game.updateLogic();
  game.updateDraw();
}
//https://code.tutsplus.com/tutorials/getting-started-with-matterjs-engine-and-world--cms-28832
Array.prototype.findObjectWithAttribute = function(attr, value)
{
    for(var i = 0; i < this.length; i += 1)
    {
        if(this[i][attr] === value)
        {
            return i;
        }
    }
    return -1;
}

function test()
{
  if (keyIsDown(LEFT_ARROW)) {
    Matter.Body.setVelocity(game.GameObjects[0].body, {x:-5,y:0});
  }

  if (keyIsDown(RIGHT_ARROW)) {
    Matter.Body.setVelocity(game.GameObjects[0].body, {x:5,y:0});
  }

  if (keyIsDown(UP_ARROW)) {
  }

  if (keyIsDown(DOWN_ARROW)) {
  }
}
