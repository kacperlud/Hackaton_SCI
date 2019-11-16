class Animation
{
  constructor(frameWidth=0,frameHeight=0,texture=null)
  {
    this.frameSize = createVector(frameWidth,frameHeight);
    this.drawSize = this.frameSize.copy();
    this.texture = texture;
    this.position = createVector();
    this.framesPerRow = 0;
    this.nextFrame =
    {
        begin: createVector(),
        end: this.frameSize
    }
    this.animationRow = 0;
    this.loopCurrentRowOnce = false;
    this.updateInterval = 70;
    this.lastUpdateTime = 0;
  }
  setTexture(texture)
  {
    this.texture = texture;
  }
  update(position)
  {
    if(millis()-this.lastUpdateTime>this.updateInterval)
    {
      this.lastUpdateTime = millis();
      this.position=position;
      if(this.loopCurrentRowOnce && ((this.nextFrame.begin.x+this.frameSize.x)%(this.frameSize.x*this.framesPerRow))==0) return;
      this.nextFrame.begin.x=((this.nextFrame.begin.x+this.frameSize.x)%(this.frameSize.x*this.framesPerRow));
    }
  }
  setRow(rowNumber)
  {
    this.animationRow = rowNumber;
    this.nextFrame.begin.y= this.frameSize.y*rowNumber;

  }
  setFrameSize(newSize)
  {
    this.frameSize = newSize;
    this.nextFrame =
    {
        begin: createVector(),
        end: this.frameSize
    }
  }
  setDrawSize(newSize)
  {
    this.drawSize = newSize;
  }
  setFramesPerRow(count)
  {
    this.framesPerRow = count;
  }
  loopRowOnce(state)
  {
    this.loopCurrentRowOnce = state;
  }
  show()
  {
    image(this.texture, this.position.x, this.position.y,
          this.drawSize.x, this.drawSize.y,
          this.nextFrame.begin.x,this.nextFrame.begin.y,
          this.nextFrame.end.x,this.nextFrame.end.y);
    //rect(this.position.x,this.position.y,100,100);
  }
}
