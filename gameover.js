"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

var audio, gameovers;
function main() {
	var doneBtn = document.getElementById("doneBtn");
	var muted = sessionStorage.getItem("muted");
    var volume = parseFloat(sessionStorage.getItem("volume"));
    audio = document.getElementsByTagName('audio')[0];

    var coins = sessionStorage.getItem("coins");

	if(muted == null){
		muted="false";
		sessionStorage.setItem("muted",muted);
	}

	if(volume >=0 && isNaN(volume)==false){
		audio.volume=volume;
	}else{
		volume=0.5;
		audio.volume=volume;
	}

	if(muted == "true"){
		audio.volume=0;

	}else if (muted =="false"){
		audio.volume=volume;
	}

	audio.play();
  var bch = function(event)
  {
    btnHandler(event);
  }
	doneBtn.addEventListener("click",bch);
}
function btnHandler(event)
{
				var top;
				var nick = document.getElementById("nickName").value;
				if(nick == "")
				{
					nick = "Unknown";
				}


				while(nick.length > 24){

					alert("Nickname too long. Must have 0 to 24 characters!");
					window.location.href = "gameover.html";
					return;

				}

				var score = parseInt(sessionStorage.getItem("score"));
				for(var i = 1; i<11; i++) {
					if(score > parseInt(sessionStorage.getItem(i)))
					{
						if(i != 10) {
							for(var j = 10; j>i; j--) {
								sessionStorage.setItem(j,sessionStorage.getItem((j-1)));
								sessionStorage.setItem(j+"nick",sessionStorage.getItem((j-1)+"nick"));
							}
						}
						sessionStorage.setItem(i,score);
						sessionStorage.setItem(i+"nick",nick);
						top = true;
						break;
					}
				}
				if(top) {
					alert("Congratulations! You made it to the top 10!");
				}
				else {
					alert("Sorry you didn't make it to the top 10, better luck next time!")
				}
				window.location.href = "rankingmenu.html";
}
