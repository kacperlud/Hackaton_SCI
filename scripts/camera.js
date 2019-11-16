class Camera
{
  constructor(x,y)
  {
    this.offset = createVector(x,y);
    this.followTarget=null;
    this.zoomValue = 1;
  }

  move(step)
  {
    this.offset.add(step);
  }

  follow(actor)
  {
    this.followTarget = actor;

  }

  update()
  {
    if(this.followTarget!=null)
    {
      this.offset.x = this.followTarget.position.x;
      this.offset.y = this.followTarget.position.y;
      ellipse(0,0,30,30);
      fill(0,255,0);

    }
    translate(this.offset.x,this.offset.y);
    scale(this.zoomValue);
  }

  zoom(zoomValue)
  {
    this.zoomValue = zoomValue;
  }
}
