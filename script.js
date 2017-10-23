
//values that can be changed with the settings
var minutes = 0;
var seconds = 5;
var bMinutes = 0;
var bSeconds = 4;

//values for the timer use only
var breakMinutes = bMinutes;
var breakSeconds = bSeconds;
var workMinutes = minutes;
var workSeconds = seconds;

//click detector
var clicker = document.getElementById('round');
if(clicker){
	clicker.addEventListener("click", workTimer);
};

//executed detects which phase the timer is in
var executed = false;
var breakExecuted = false;

//global value for interval so we can stop them later
var intervalWork;
var intervalBreak;

var d = new Date();

function workTimer(){
	if(!executed){
		var time = d.getTime() / 1000;
		console.log(time);
		var time2;
		document.getElementById('round').style.backgroundColor = '#c41b01';
		executed = true;
		workSeconds = seconds;
		workMinutes = minutes;

		intervalWork = setInterval(function(){
			
			if(workSeconds == 0){
				workMinutes--;
				workSeconds = 60;
			}
			workSeconds--;
			document.getElementById('timer').innerHTML = workMinutes + ':' + workSeconds;
			if(workSeconds < 10){
				document.getElementById('timer').innerHTML = workMinutes + ':' + '0' + workSeconds;
			}
			if(workMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +workMinutes + ':' + workSeconds;
			}

			if(workSeconds < 10 && workMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +workMinutes + ':' + '0' + workSeconds;
			}
			if(workMinutes == 0 && workSeconds == 0){
				breakTimer();
				clearWork();
				breakExecuted = false;
			}

		}, 1000);

	} else if(!breakExecuted){
		clearWork();
		time2 = d.getTime() / 1000;
		console.log(time-time2);

	}

}


function breakTimer(){
	if(!breakExecuted){
		breakExecuted = true;
		executed = false;
		breakMinutes = bMinutes;
		breakSeconds = bSeconds;
		document.getElementById('round').style.backgroundColor = '#c5db00';


		intervalBreak = setInterval(function(){
			if(breakSeconds == 0){
				breakMinutes--;
				breakSeconds = 60;
			}
			breakSeconds--;
			document.getElementById('timer').innerHTML = breakMinutes + ':' + breakSeconds;
			if(breakSeconds < 10){
				document.getElementById('timer').innerHTML = breakMinutes + ':' + '0' + breakSeconds;
			}
			if(breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +breakMinutes + ':' + breakSeconds;
			}

			if(breakSeconds < 10 && breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +breakMinutes + ':' + '0' + breakSeconds;
			}
			if(breakMinutes == 0 && breakSeconds == 0){
				workTimer();
				clearBreak();
				executed = false;
			}

		}, 1000); 
	} else {
		clearBreak();
	}
}



//work pausing function
function clearWork(){
	clearInterval(intervalWork);
	executed = false;
}

function clearBreak(){
	clearInterval(intervalBreak);
	breakExecuted = false;
	executed = true; 
}







//starter timer on windows load
function setTime(){

	document.getElementById('timer').innerHTML = minutes + ':' + seconds;
	if(seconds < 10){
		document.getElementById('timer').innerHTML = minutes + ':' + '0' + seconds;
	}
	if(minutes < 10){
		document.getElementById('timer').innerHTML = '0' +minutes + ':' + seconds;
	}

	if(seconds < 10 && minutes < 10){
		document.getElementById('timer').innerHTML = '0' +minutes + ':' + '0' + seconds;
	}
}

window.onload = setTime();