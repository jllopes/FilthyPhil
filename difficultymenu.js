"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

var audio;
var mouseoversound;
function main()
{

	audio = document.getElementsByTagName('audio')[0];
	mouseoversound = document.getElementsByTagName('audio')[1];
	var tillPlayed = parseFloat(sessionStorage.getItem("tillPlayed"));
	
	if(isNaN(tillPlayed)==false){
		audio.currentTime=tillPlayed;
	}else{audio.currentTime=0;}

	var volume = parseFloat(sessionStorage.getItem("volume"));
	var muted = sessionStorage.getItem("muted");
	
	if(volume >=0 && isNaN(volume)==false){
		audio.volume=volume;
		mouseoversound.volume = 1;
	}else{
		volume=0.5;
		audio.volume=volume;
		mouseoversound.volume = 1;
	}


	if(muted == "true"){
		audio.volume=0;
		mouseoversound.volume = 0;

	}else if (muted =="false"){
		audio.volume=volume;
		mouseoversound.volume = 1;
		if(volume <= 0.1){
			mouseoversound.volume = 0;
		}
	}

	audio.play();

	var easyBtn = document.getElementById("easyBtn");
	var mediumBtn = document.getElementById("mediumBtn");
	var hardBtn = document.getElementById("hardBtn");
	var backBtn = document.getElementById("backBtn");
	var bch = function(event)
	{
		btnHandler(event);
	}
	easyBtn.addEventListener("click",bch);
	mediumBtn.addEventListener("click",bch);
	hardBtn.addEventListener("click",bch);
	backBtn.addEventListener("click",bch);
}

function btnHandler(event)
{
	var difficulty = "";
	var name = event.currentTarget.id;
	var btn = event.currentTarget;
	switch (name) {
		case "easyBtn":
			difficulty = "easy";
			sessionStorage.setItem("difficulty",difficulty);
			window.location.href = "playmenu.html";
		// TODO: enviar informação para motor a dizer a dificuldade
			break;
		case "mediumBtn":
			difficulty = "medium"
			sessionStorage.setItem("difficulty",difficulty);
			// TODO: enviar informação para motor a dizer a dificuldade
			window.location.href = "playmenu.html";

			break;
		case "hardBtn":
			difficulty = "hard";
			sessionStorage.setItem("difficulty",difficulty);
			window.location.href = "playmenu.html";

		// TODO: enviar informação para motor a dizer a dificuldade
			break;
		case "backBtn":
			sessionStorage.setItem("tillPlayed",audio.currentTime.toString());
			window.location.href = "playmenu.html";
			break;
		}
}

function mouseoverplay(){
	mouseoversound.play();
}