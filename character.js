"use strict";

class Character
{
		constructor(ctx,canvasWidth,canvasHeight)
		{
			this.context = ctx;
			this.runSpriteImage = new Image();
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
			this.runSpriteImage.onload = function () {
				console.log("image loaded");
			}
			this.runSpriteImage.src = "Dog_Run.png";
			this.runSprite = new Sprite(this.context,1900,300,this.runSpriteImage,this.canvasWidth,this.canvasHeight,6,true,this.canvasWidth*0.1,this.canvasHeight*0.8);
			this.jumpSpriteImage = new Image();
			this.jumpSpriteImage.onload = function () {
				console.log("image loaded");
			}
			this.jumpSpriteImage.src = "Dog_Jump.png";
			this.jumpSprite = new Sprite(ctx,2800,500,this.jumpSpriteImage,this.canvasWidth,this.canvasHeight,8,false,this.canvasWidth*0.1,this.canvasHeight*0.7);
			this.caughtSpriteImage = new Image();
			this.caughtSpriteImage.onload = function () {
				console.log("image loaded");
			}
			this.caughtSpriteImage.src = "Dog_Caught.png";
			this.caughtSprite = new Sprite(ctx,1470,300,this.caughtSpriteImage,this.canvasWidth,this.canvasHeight,5,false,this.canvasWidth*0.1,this.canvasHeight*0.8);
			this.flySpriteImage = new Image();
			this.flySpriteImage.onload = function() {
				console.log("image loaded");
			}
			this.flySpriteImage.src = "Dog_Fly.png";
			this.flySprite = new Sprite(ctx,1800,400,this.flySpriteImage,this.canvasWidth,this.canvasHeight,3,true,this.canvasWidth*0.1,this.canvasHeight*0.8);
			this.runSprite.active = 1;
			this.move = true;
		}

		update()
    {
			if(this.jumpSprite.active == 1)
			{
				this.jumpSprite.update();
				this.jumpSprite.render();
			}
			else if(this.caughtSprite.active == 1)
			{
				this.caughtSprite.updateCaught();
				this.caughtSprite.render();
			}
			else if(this.runSprite.active == 1){
					this.runSprite.update();
					this.runSprite.render();
				}
			else {
					this.flySprite.update();
					this.flySprite.render();
				}
			}
}
