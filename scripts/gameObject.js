class GameObject
{
  constructor(objWidth,objHeight)
  {
    this.body = null;
    this.size = createVector(objWidth,objHeight);
    this.animation = null;
  }

  updateLogic()
  {

  }

  updateDraw()
  {
    this.animation.update(createVector(this.body.position.x,this.body.position.y));
    this.animation.show();
  }
  updateDrawTest()
  {
    if(this.animation.framesPerRow==14)
    {
      push();
      translate(this.body.position.x,this.body.position.y);
      rect(0,0,this.size.x,this.size.y);
      pop();
    }
    else
    {
      rect(this.body.position.x,this.body.position.y,this.size.x,this.size.y);
    }

  }

  setBody(obj)
  {
    this.body = obj;
    this.size = createVector();
    this.animation.setDrawSize(createVector(this.size.x/2,this.size.y/2));
  }

  initAnimation(frameWidth,frameHeight,texture,framesPerRow)
  {
    this.animation= new Animation(frameWidth,frameHeight,texture);
    this.animation.setFramesPerRow(framesPerRow);
    this.animation.setDrawSize(this.size);
  }

  checkBoundries()
  {
    if(this.body.position.y-this.size.y/2 > height || this.body.position.x+this.size.x/2 > width || this.body.position.x-this.size.x/2 < 0) return true;
    else return false;
  }
}
