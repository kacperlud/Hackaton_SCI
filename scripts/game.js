class Game
{
  constructor()
  {
    this.Engine = Matter.Engine;
    this.World = Matter.World;
    this.Bodies = Matter.Bodies;
    this.Constraint = Matter.Constraint;
    this.Composites = Matter.Composites;
    this.MouseConstraint = Matter.MouseConstraint;
    this.Mouse = Matter.Mouse;
    this.Engine = this.Engine.create();
    this.GameObjects = [];
    this.snowBalls = [];
    Matter.Engine.run(this.Engine);
  }
  updateLogic()
  {
    this.spawnSnowBalls();
    this.spawnRandomObject();
    for(let i=this.GameObjects.length-1;i>=0;i--)
    {
      this.GameObjects[i].updateLogic();
      if(this.GameObjects[i].checkBoundries())
      {
        this.GameObjects.splice(i,1);
      }
    }
    for(let i=this.snowBalls.length-1;i>=0;i--)
    {
      this.snowBalls[i].updateLogic();
      let mouse = createVector(mouseX,mouseY);
      let pos = createVector(this.snowBalls[i].body.position.x,this.snowBalls[i].body.position.y);
      let diff = pos.sub(mouse).setMag(0.005);
      Matter.Body.applyForce(this.snowBalls[i].body, this.snowBalls[i].body.position, diff);
      if(this.snowBalls[i].checkBoundries())
      {
        console.log("aaa");
        this.snowBalls.splice(i,1);
      }
    }
  }
  updateDraw()
  {
    for(let obj of this.GameObjects)
    {
      obj.updateDraw();
      //obj.updateDrawTest();
    }
    for(let obj of this.snowBalls)
    {
      obj.updateDraw();
    }
  }

  dev()
  {
    this.loadMap(1);
  }

  play()
  {
    this.dev();
  }

  loadMap(id)
  {
    this.GameObjects = [];
    this.World.clear(this.Engine.world);
    Matter.Engine.clear(this.Engine);
    loadJSON("maps/lvl"+id+".json",this.createMap);

  }
  createMap(jsonSource)
  {
    // add revolute constraint
    for(let elem of jsonSource.data)
    {
      let tmp = new GameObject(elem.width,elem.height);
      if(elem.type=="block")
      {
        tmp.body = game.Bodies.rectangle(elem.posX,elem.posY,
                                         elem.width,elem.height,
                                         typeof elem.options === "undefined" ? {} : elem.options);
        let txConfIndex = textureData.data.findObjectWithAttribute("name",elem.textureName)
        tmp.initAnimation(textureData.data[txConfIndex].txWidth,
                          textureData.data[txConfIndex].txHeight,
                          textures[elem.textureName],
                          textureData.data[txConfIndex].framesPerRow);
        tmp.updateInterval = elem.interval;
                          //console.log(textureData.data[txConfIndex].framesPerRow);
      }
      else if(elem.type="background")
      {
        backgroundImage = textures[elem.name];
      }
      if(elem.textureName=="grinch") player = tmp;
      game.World.add(game.Engine.world,[tmp.body]);
      game.GameObjects.push(tmp);
    }
  }

  spawnSnowBalls()
  {
    for(let i=0;i<2;i++)
    {
      if(this.snowBalls.length>120) return;
      let r = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
      let ball  = new GameObject(r,r);
      ball.body = this.Bodies.circle(Math.floor(Math.random() * (width-r - r + 1)) + r,0,r);
      ball.initAnimation(128,128,textures["snow"],1);
      Matter.Body.applyForce(ball.body, ball.body.position, {x:0,y:0.2,z:0});
      this.snowBalls.push(ball);
      game.World.add(game.Engine.world,[ball.body]);
    }
  }

  spawnRandomObject()
  {
    // if(this.GameObjects.length>1) return;
    // let ball  = new GameObject(227*0.66,192*0.66);
    // ball.body = this.Bodies.circle(Math.floor(Math.random() * (width+1)),0,227*0.66,192*0.66);
    // ball.initAnimation(455,384,textures["boxy"],3);
    // this.GameObjects.push(ball);
    // game.World.add(game.Engine.world,[ball.body]);
  }
}
/*

https://stackoverflow.com/questions/34913835/how-can-i-move-camera-in-matter-js
https://codepen.io/vanuatu/pen/VeQMpp

*/
