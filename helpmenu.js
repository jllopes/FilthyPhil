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

	var backBtn = document.getElementById("backBtn");
	var bch = function(event)
	{
		btnHandler(event);
	}
	backBtn.addEventListener("click",bch);
}

function btnHandler(event)
{
		sessionStorage.setItem("tillPlayed",audio.currentTime.toString());
		window.location.href = "optionsmenu.html";
}

function mouseoverplay(){
	mouseoversound.play();
}
