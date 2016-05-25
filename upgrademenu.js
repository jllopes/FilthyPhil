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
	document.getElementById("coins").innerHTML = "COINS: " + sessionStorage.getItem("coins");
	var oneHundredBtn = document.getElementById("oneHundredBtn");
	var fiveHundredBtn = document.getElementById("fiveHundredBtn");
	var backBtn = document.getElementById("backBtn");
	var bch = function(event)
	{
		btnHandler(event);
	}
	oneHundredBtn.addEventListener("click",bch);
	fiveHundredBtn.addEventListener("click",bch);
	backBtn.addEventListener("click",bch);
}

function btnHandler(event)
{
	var name = event.currentTarget.id;
	var btn = event.currentTarget;
	var coins = sessionStorage.getItem("coins");
	switch (name) {
		case "oneHundredBtn":
			if(coins >= 10){
				alert("Congratulations! \nYou now have a 100 meters boost for your next game!");
				sessionStorage.setItem("boost",100);
				sessionStorage.setItem("coins",coins-10);
				document.getElementById("coins").innerHTML = "COINS: " + sessionStorage.getItem("coins");
			}
			else {
				alert("Keep playing! \nYou do not have enough coins!");
			}
			break;
		case "fiveHundredBtn":
			if(coins >= 50){
				alert("Congratulations! \nYou now have a 500 meters boost for your next game!");
				sessionStorage.setItem("boost",500);
				sessionStorage.setItem("coins",coins-50);
				document.getElementById("coins").innerHTML = "COINS: " + sessionStorage.getItem("coins");
			}
			else {
				alert("Keep playing! \nYou do not have enough coins!");
			}
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