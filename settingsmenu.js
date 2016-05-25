"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

var audio;
var bar, slider;
var mouseoversound;

function main()
{
	audio = document.getElementsByTagName('audio')[0];
	var volume = parseFloat(sessionStorage.getItem("volume"));
    var tillPlayed = parseFloat(sessionStorage.getItem("tillPlayed"));
    var muted = sessionStorage.getItem("muted");
    mouseoversound = document.getElementsByTagName('audio')[1];




	bar = document.getElementById('bar');
	slider = document.getElementById('slider');

	var backBtn = document.getElementById("backBtn");
	var minusBtn = document.getElementById("minusBtn");
	var plusBtn = document.getElementById("plusBtn");


	var muted = sessionStorage.getItem("muted");
 	if(isNaN(tillPlayed)==false){
        audio.currentTime=tillPlayed;
    }else{audio.currentTime=0;}

    if(muted == null){
        muted="false";
        sessionStorage.setItem("muted",muted);
    }


    if(volume >=0 && isNaN(volume)==false){
        audio.volume=volume;
        mouseoversound.volume = 1;
    }else{
        volume=0.5;
        audio.volume=volume;
        slider.style.width = (audio.volume * 100) + '%';
        mouseoversound.volume = 1;
    }


    if(muted == "true"){
        audio.volume=0;
        mouseoversound.volume = 0;

    }else if (muted =="false"){
    	console.log(volume);
        audio.volume=volume;
        mouseoversound.volume = 1;
        if(volume <= 0.1){
			mouseoversound.volume = 0;
		}
    }

    audio.play();

	var bch = function(event)
	{
		sessionStorage.setItem("tillPlayed",audio.currentTime.toString());
		btnHandler(event);
	}

	backBtn.addEventListener("click",bch);
	minusBtn.addEventListener("click",bch);
	plusBtn.addEventListener("click",bch);
	muteBtn.addEventListener("click",bch);


}


function btnHandler(event)
{

	var volume = audio.volume;
	var name = event.currentTarget.id;
	var btn = event.currentTarget;
	var muted = sessionStorage.getItem("muted");
	switch (name) {

		case "backBtn":
			window.location.href = "optionsmenu.html";
			break;
		case "minusBtn":
			if(volume >= 0.10){
				audio.volume=volume-0.1;
				volume=audio.volume;
				if (volume <= 0.1){
					mouseoversound.volume = 0;
				}
				slider.style.width = (volume * 100) + '%';
				sessionStorage.setItem("volume",audio.volume.toString());
			}

			break;
		case "plusBtn":
			if(audio.volume <= 0.9){
				audio.volume=volume+0.1;
				volume=audio.volume;
				slider.style.width = (volume * 100) + '%';
				sessionStorage.setItem("volume",audio.volume.toString());
				sessionStorage.removeItem("volumeMute");
                sessionStorage.setItem("muted","false");
				mouseoversound.volume = 1;
			}
			break;
		case "muteBtn":
			if( muted == "true"){
				sessionStorage.setItem("muted","false");
                audio.volume=parseFloat(sessionStorage.getItem("volumeMute"));
                mouseoversound.volume = 1;


			}else if(muted = null || muted == "false"){

				sessionStorage.setItem("muted","true");
                sessionStorage.setItem("volumeMute",audio.volume.toString());
                audio.volume=0;
                mouseoversound.volume = 0;
			}
			break;
	}

}
function mouseoverplay(){
	
	mouseoversound.play();
}
