"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());
var audio,gameovers,jumpsound;
function main()
{
	/*GET CANVAS INFO*/
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var canvas2 = document.getElementById("myCanvas2");
	var ctx2 = canvas2.getContext("2d");
	var canvasWidth2 = canvas2.width;
	var canvasHeight2 = canvas2.height;
	/* GET AUDIO INFO */
	var volume = parseFloat(sessionStorage.getItem("volume"));
	var muted = sessionStorage.getItem("muted");
	audio = document.getElementsByTagName('audio')[0];
	gameovers = document.getElementsByTagName('audio')[1];
	jumpsound = document.getElementsByTagName('audio')[2];


	if(muted == null){
		muted="false";
		sessionStorage.setItem("muted",muted);
	}

	if(volume >=0 && isNaN(volume)==false){
		audio.volume=volume;
		gameovers.volume = volume;
		jumpsound.volume = volume;
	}else{
		volume=0.5;
		audio.volume=volume;
		gameovers.volume = volume
		jumpsound.volume = volume;
	}

	if(muted == "true"){
		audio.volume=0;
		gameovers.volume = 0;
		jumpsound.volume = 0;

	}else if (muted =="false"){
		audio.volume=volume;
		gameovers.volume = volume;
		jumpsound.volume = volume;
	}

	audio.play();


	/*INITIALIZE VARIABLES*/
	var char = new Character(ctx,canvasWidth,canvasHeight);
	char.update(); /*First Render*/
	var score = 0;
	var obstacle;
	var newObstacle = null;
	var animationFrame;
	var coins = 0;
	/*Get coins*/
	var initialCoins = parseInt(sessionStorage.getItem("coins"));
	/*Get difficulty*/
	var difficulty = sessionStorage.getItem("difficulty");
	/*Get upgrade*/
	var boost = parseInt(sessionStorage.getItem("boost"));
	/*OBSTACLE IMAGE*/
	var obstacleImage = new Image();
	obstacleImage.onload = function () { /*Wait for Load*/
		var canvas = document.getElementById("myCanvas2");
		var ctx = canvas.getContext("2d");
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;
		obstacle = new Obstacle(canvasWidth,canvasHeight*0.85,350,180,obstacleImage,ctx,canvasWidth,canvasHeight,20);
		gameLoop();
	}
	obstacleImage.src = "../Assets/cage.png"
	/*MAIN FUNCTION*/
	function gameLoop () {
		animationFrame = window.requestAnimationFrame(gameLoop);
		document.onkeypress = keyCheck;
		char.update();
		score++;
		var rand = Math.random();
		var rand2 = Math.random();
		var dist = rand2*1600
		var minDist = 1000;
		document.getElementById("score").innerHTML = "SCORE: " + Math.round(score/10) + "\n";
		document.getElementById("coins").innerHTML = "COINS: " + coins + "\n";
		/* Verify if there is an active boost */
		if(boost == 100 || boost == 500)
		{
			char.flySprite.active = 1;
			char.runSprite.active = 0;
			score+=4;
			if(Math.round(score/10) == boost)
			{
				char.flySprite.active = 0;
				char.flySprite.clear();
				char.runSprite.active = 1;
				boost = 0;
			}
		}
		else {
		/*Create/Update Obstacles*/
			if(obstacle != null) {
				/*Check Collision for Active Sprite*/
				if(char.jumpSprite.active) {
					if (collides(obstacle,char.jumpSprite)) {
						endGame(coins);
					}
				}
				else if(char.runSprite.active) {
					if (collides(obstacle,char.runSprite)) {
							endGame(coins);
					}
				}
				/*Check if obstacle reached end of Canvas*/
				if(obstacle.posx + obstacle.width < 0) {
					obstacle = new Obstacle(canvasWidth2,canvasHeight2*0.85,330,180,obstacleImage,ctx2,canvasWidth2,canvasHeight2,20);
				}
				if(obstacle.posx - canvasWidth2 > -(dist+Math.random()*500) && obstacle.posx - canvasWidth2 < -minDist)	{
					if(rand2<0.6 && (difficulty == "medium" || difficulty == "hard")) {
							if(newObstacle != null) {
								/*Check if newObstacle reached end of Canvas*/
								if(newObstacle.posx + newObstacle.width < 0) {
									newObstacle = new Obstacle(canvasWidth2,canvasHeight2*0.85,330,180,obstacleImage,ctx2,canvasWidth2,canvasHeight2,20);
								}
							}
							else {
								newObstacle = new Obstacle(canvasWidth2,canvasHeight2*0.85,330,180,obstacleImage,ctx2,canvasWidth2,canvasHeight2,20);
							}

					}
				}
				if(newObstacle != null) {
					/*Check Collision for Active Sprite*/
					if(char.jumpSprite.active) {
						if (collides(newObstacle,char.jumpSprite)) {
							endGame(coins);
						}
					}
					else if(char.runSprite.active) {
						if (collides(newObstacle,char.runSprite)) {
								endGame(coins);
						}
					}
				}
			}
			/*Update obstacle position*/
			if(char.move) {
				obstacle.move();
				/*Update newObstacle position*/
				if(newObstacle!=null) {
					newObstacle.move();
				}
			}
	}
		coins = Math.floor(Math.round(score/10)/25);
	}

function collides(obstacle,element) {
	if(obstacle.boundingBoxCollision(element) && obstacle.pixelCollision(element)) {
		return true;
	}
	else {
		return false;
	}
}

function endGame(coins) {
	char.runSprite.clear()
	char.jumpSprite.clear();
	char.caughtSprite.active = 1;
	char.jumpSprite.active = 0;
	char.runSprite.active = 0;
	char.move = false;
	while(char.caughtSprite.frameIndex != char.caughtSprite.numberOfFrames-1)
	{
		char.update();
	}
	window.cancelAnimationFrame(animationFrame);
	/*Go to Game Over Menu*/
	sessionStorage.setItem("score",Math.round(score/10));
	var totalCoins = coins + initialCoins;
	sessionStorage.setItem("coins",totalCoins);
	sessionStorage.setItem("boost",0);
	audio.pause();
	setTimeout(function(){ gameovers.play(); }, 0);
	setTimeout(function(){window.location.href = "gameover.html";},2500)

}

function keyCheck(e) {
	if (e.keyCode == 32) {
		e.preventDefault();
		if(boost == 0) {
		if(obstacle != null) {
			if (collides(obstacle,char.jumpSprite)) {
				endGame();
			}
		}
		if(newObstacle != null){
			if (collides(newObstacle,char.jumpSprite)) {
					endGame();
			}
		}
		if(char.move) {
		if(char.jumpSprite.active && (difficulty == "easy" || difficulty == "medium")) {
			var firstPosition = 0.7;
			var positionOne = 0.7;
			var positionTwo = 0.65;
			var positionThree = 0.6;
			var positionFour = 0.55;
			if(char.jumpSprite.posy == char.jumpSprite.canvasHeight * firstPosition) {
				jumpsound.play();
			switch (char.jumpSprite.frameIndex) {
				case 0:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionOne;
					char.jumpSprite.frameIndex = 0;
					break;
				case 1:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionTwo;
					char.jumpSprite.frameIndex = 0;
					break;
				case 2:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionThree;
					char.jumpSprite.frameIndex = 0;
					break;
				case 3:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionFour;
					char.jumpSprite.frameIndex = 0;
					break;
				case 4:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionFour;
					char.jumpSprite.frameIndex = 0;
					break;
				case 5:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionThree;
					char.jumpSprite.frameIndex = 0;
					break;
				case 6:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionTwo;
					char.jumpSprite.frameIndex = 0;
					break;
				case 7:
					char.jumpSprite.clear();
					char.jumpSprite.posy = char.jumpSprite.canvasHeight * positionOne;
					char.jumpSprite.frameIndex = 0;
					break;
					}
				}
			}
		else
		{	if(!char.jumpSprite.active){
			jumpsound.play();
			}
			char.runSprite.clear();
			char.runSprite.frameIndex = 0;
			char.jumpSprite.active = 1;
		}
	}
	}
}
}
}
