"use strict";

class Obstacle extends Element
{
  constructor(posx,posy,width,height,image,context,canvasWidth,canvasHeight,speed)
  {
    super(context,width,height,image,canvasWidth,canvasHeight,posx,posy);
    this.speed = speed;
    this.imgData = context.getImageData(this.posx,this.posy,this.width,this.height);
    this.canvas = document.createElement("canvas");
    this.cw = this.width;
    this.ch = this.height;
    this.ctx = this.canvas.getContext("2d");

  }
  draw()
  {
    this.context.drawImage(this.image,this.posx,this.posy,this.width,this.height);
  }
  clear(posx)
  {
    this.context.clearRect(posx,this.posy,this.width,this.height);
  }
  move()
  {
    var posx = this.posx;
    this.posx = this.posx - this.speed;
    this.clear(posx);
    this.draw();
  }

  boundingBoxCollision(element){
        if(this.posy + this.height < element.posy || this.posy > element.posy + element.height || this.posx + this.width < element.posx || this.posx > element.posx + element.width/element.numberOfFrames) {
          return false;
        }
        return true;

  }
 pixelCollision(element){
    var xmin, xmax, ymin, ymax;

    /* Determine collision box */
    xmin = Math.max(this.posx, element.posx);
    xmax = Math.min(this.posx + this.width, element.posx + element.width/element.numberOfFrames);
    ymin = Math.max(this.posy, element.posy);
    ymax = Math.min(this.posy + this.height, element.posy + element.height);

    this.ctx.drawImage(this.image,0,0,this.width,this.height);
    var imgData1 = this.ctx.getImageData(0,0,this.cw,this.ch);

    element.ctx.drawImage(element.image,0,0,element.width/element.numberOfFrames,element.height);
    var imgData2 = element.ctx.getImageData(0,0,element.cw,element.ch);

    /* Check collision box pixels */
    for(var ym=ymin;ym<ymax;ym++){
        for(var xm=xmin;xm<xmax;xm++){
               if(imgData1.data[4*((ym)*this.width + xm)+3] !=0 && imgData2.data[4*((ym)*element.width/element.numberOfFrames  + xm)+3] !=0){
                  return true;
            }
        }
    }
    return false;
}
}
