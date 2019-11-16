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
    for(let obj of this.GameObjects)
    {
      obj.updateLogic();
    }
    for(let obj of this.snowBalls)
    {
      obj.updateLogic();
      if(Matter.Detector.canCollide(player, obj)){console.log("aaa");this.World.remove(obj);}
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
      if(elem.type="block")
      {
        tmp.body = game.Bodies.rectangle(elem.posX,elem.posY,
                                         elem.width,elem.height,
                                         typeof elem.options === "undefined" ? {} : elem.options);
        let txConfIndex = textureData.data.findObjectWithAttribute("name",elem.textureName)
        tmp.initAnimation(textureData.data[txConfIndex].txWidth,
                          textureData.data[txConfIndex].txHeight,
                          textures[elem.textureName],
                          textureData.data[txConfIndex].framesPerRow);
                          //console.log(textureData.data[txConfIndex].framesPerRow);
      }
      if(elem.textureName=="grinch") player = tmp;
      game.World.add(game.Engine.world,[tmp.body]);
      game.GameObjects.push(tmp);
    }
  }

  spawnSnowBalls()
  {
    for(let i=0;i<1;i++)
    {
      let r = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
      let ball  = new GameObject(r,r);
      ball.body = this.Bodies.circle(Math.floor(Math.random() * (width-r - r + 1)) + r,0,r);
      ball.initAnimation(384,540,textures["test"],5);
      this.snowBalls.push(ball);
      game.World.add(game.Engine.world,[ball.body]);
    }
  }
}
/*

https://stackoverflow.com/questions/34913835/how-can-i-move-camera-in-matter-js
https://codepen.io/vanuatu/pen/VeQMpp

*/
