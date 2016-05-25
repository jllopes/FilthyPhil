"use strict";

class Element
{
	constructor(context,width,height,image,canvasWidth,canvasHeight,posx,posy)
	{
			this.context = context;
			this.width = width;
			this.height = height;
			this.image = image;
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
			this.posx = posx;
			this.posy = posy;
			this.canvas = document.createElement("canvas");
    		this.cw = this.width;
    		this.ch = this.height;
    		this.ctx = this.canvas.getContext("2d");
		}
}

class Sprite extends Element
{
	constructor(context,width,height,image,canvasWidth,canvasHeight,numberOfFrames,loop,posx,posy)
	{
			super(context,width,height,image,canvasWidth,canvasHeight,posx,posy);
			this.frameIndex = 0;
			this.tickCount = 0;
			this.ticksPerFrame = 5;
			this.numberOfFrames = numberOfFrames;
			this.active = 0;
			this.loop = loop;
		}
	render() {
		if(this.active == 1){
		this.context.clearRect(this.posx, this.posy, this.width, this.height);
		this.context.drawImage(this.image, this.frameIndex * this.width / this.numberOfFrames, 0, this.width / this.numberOfFrames-5, this.height, this.posx, this.posy, this.width / this.numberOfFrames, this.height);
	}
	else {
		return;
	}
};

	update() {
				this.tickCount += 1;

				if (this.tickCount > this.ticksPerFrame) {

						this.tickCount = 0;

						// If the current frame index is in range
						if (this.frameIndex < this.numberOfFrames-1) {
								// Go to the next frame
								this.frameIndex += 1;
						} else if(this.loop){
								this.frameIndex = 0;
						}
						else {
							this.active = 0;
							this.clear();
							this.frameIndex = 0;
							this.posy = this.canvasHeight * 0.7;
							}
						}
		};

		updateCaught(){
			this.tickCount += 1;

			if (this.tickCount > this.ticksPerFrame) {

					this.tickCount = 0;

					// If the current frame index is in range
					if (this.frameIndex < this.numberOfFrames-1) {
							// Go to the next frame
							this.frameIndex += 1;
					} else if(this.loop){
							this.frameIndex = 0;
					}
					else {
						this.active = 0;
					}
			}
		}

		clear() {
					this.context.clearRect(this.posx, this.posy, this.width, this.height);
		}
		getActive() {
				return this.active;
		}
}
