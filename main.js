var niepotrzebnazmienna = 0;
var playbutton;
var levelbutton;
var canvaswidth = 900;
var canvasheight = 600;
//////////////////////
let game;
let testimg;
let textures = [];
let textureData;
let camera;
let player;
let grinch;

function playscreen()
{
  var playbuttonwidth = 200;
  var playbuttonheight = 50;

  playbutton = new Clickable();
  playbutton.resize(playbuttonwidth,playbuttonheight);
  playbutton.cornerRadius = 5;
  playbutton.locate(canvaswidth/2 - playbuttonwidth/2,canvasheight/2 - playbuttonheight/2);
  playbutton.color = "#c82d2d";
  playbutton.text = "Play";
  playbutton.textSize = 30;
  playbutton.textFont = "Montserrat";

  playbutton.onOutside = function()
  {
    this.color = "#c82d2d";
  }
  playbutton.onHover = function()
  {
    this.color = "#FFFFFF";
    this.textColor = "#000000";
  }
  playbutton.onPress = function()
  {
    niepotrzebnazmienna++;
  }
}

function levels()
{
  var n=1;
  for (var i = 0; i < 4; i++)
  {
    for (var j = 0; j < 6; j++)
    {
      var levelbuttonwidth = 100;
      var levelbuttonheight = 100;

      let levelbutton = new Clickable();

      levelbutton.resize(levelbuttonwidth,levelbuttonheight);
      levelbutton.cornerRadius = 5;
      levelbutton.locate(j * levelbuttonwidth + 40 * j + 50, i * levelbuttonheight + 40 * i + 40);
      levelbutton.color = "#c82d2d";
      levelbutton.text = "Level " + n;
      n++;
      levelbutton.textSize = 30;
      levelbutton.textFont = "Montserrat";

      levelbutton.draw();

      levelbutton.onOutside = function()
      {
        this.color = "#c82d2d";
      }
      levelbutton.onHover = function()
      {
        this.color = "#FFFFFF";
        this.textColor = "#000000";
      }
      levelbutton[0][0].onPress = function()
      {
        niepotrzebnazmienna++;
      }
    }
  }
}
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
  createCanvas(canvaswidth,canvasheight);
  playscreen();

  rectMode(CENTER);
  imageMode(CENTER);
  createCanvas(900,600);
  camera = new Camera();
  game = new Game();
  game.play();
}

function draw()
{
  background(49, 163, 76);
  if (niepotrzebnazmienna == 0)
  {
    playbutton.draw();
  }
  else if (niepotrzebnazmienna == 1)
  {
    // levelbutton.draw();
      levels();
  }
  else if (niepotrzebnazmienna == 2)
  {
    background(51);
    game.updateLogic();
    game.updateDraw();
  }
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
