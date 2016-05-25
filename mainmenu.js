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
	/*Initialize sessionStorage Variables*/
	for(var i = 1; i<11; i++) {
		if(sessionStorage.getItem(i) == null && sessionStorage.getItem(i + "nick") == null) {
			sessionStorage.setItem(i,0);
			sessionStorage.setItem(i+"nick","Jorge");
		}
	}
	if(sessionStorage.getItem("coins") == null) {
		sessionStorage.setItem("coins",0);
	}
	if(sessionStorage.getItem("difficulty") == null) {
		sessionStorage.setItem("difficulty","medium");
	}
	if(sessionStorage.getItem("boost") == null) {
		sessionStorage.setItem("boost",0);
	}
	var canvas = document.getElementById("canvas");
	var playBtn = document.getElementById("playBtn");
	var optionsBtn = document.getElementById("optionsBtn");
	var rankingBtn = document.getElementById("rankingBtn");
	var tillPlayed = parseFloat(sessionStorage.getItem("tillPlayed"));
	audio = document.getElementsByTagName('audio')[0];
	mouseoversound = document.getElementsByTagName('audio')[1];

	if(isNaN(tillPlayed)==false){
		audio.currentTime=tillPlayed;
	}
	else{audio.currentTime=0;}

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
		audio.volume = 0;
		mouseoversound.volume = 0;

	}else if (muted =="false"){
		audio.volume=volume;
		mouseoversound.volume = 1;
		if(volume <= 0.1){
			mouseoversound.volume = 0;
		}
	}

	audio.play();

	var bch = function(event)
	{
		btnHandler(event);
	}
	playBtn.addEventListener("click",bch);
	optionsBtn.addEventListener("click",bch);
	rankingBtn.addEventListener("click",bch);
}

function btnHandler(event)
{
	var name = event.currentTarget.id;
	var btn = event.currentTarget;
	switch (name) {
		case "playBtn":
			sessionStorage.setItem("tillPlayed",audio.currentTime.toString());
			window.location.href = "playmenu.html";
			break;
		case "optionsBtn":
			sessionStorage.setItem("tillPlayed",audio.currentTime.toString());
			window.location.href = "optionsmenu.html";
			break;
		case "rankingBtn":
			sessionStorage.setItem("tillPlayed",audio.currentTime.toString());
			window.location.href = "rankingmenu.html";
			break;
		}
}

function mouseoverplay(){
	mouseoversound.play();
}
