class Game
{
  constructor()
  {
    this.Engine = Matter.Engine;
    this.World = Matter.World;
    this.Bodies = Matter.Bodies;
    this.Engine = this.Engine.create();
    this.GameObjects = [];
    Matter.Engine.run(this.Engine);
  }
  updateLogic()
  {
    for(let obj of this.GameObjects)
    {
      obj.updateLogic();
    }
  }
  updateDraw()
  {
    for(let obj of this.GameObjects)
    {
      //obj.updateDraw();
      obj.updateDrawTest();
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
                          console.log(textureData.data[txConfIndex].framesPerRow);
      }
      game.World.add(game.Engine.world,[tmp.body]);
      game.GameObjects.push(tmp);
    }
  }
}
/*

https://stackoverflow.com/questions/34913835/how-can-i-move-camera-in-matter-js
https://codepen.io/vanuatu/pen/VeQMpp





console.log(gamemap);
console.log(gamemap.data.length);
for(let obj in gamemap.data)
{
  console.log(obj);
}
// Object.keys(gamemap).forEach(function(key,index)
// {
//   console.log("key");
//   console.log(key);
//   // let tmp = new GameObject(elem.width,elem.height);
//   // if(elem.type="block")
//   // {
//   //   tmp.body = this.Bodies.rectangle(elem.posX,elem.poxY,
//   //                                    elem.width,elem.height,
//   //                                    typeof elem.options === 'undefined' ? {} : elem.options);
//   // }
//   // this.World.add(this.Engine.world,tmp);
//   // this.GameObjects.push(tmp);
// });


*/
