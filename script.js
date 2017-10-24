
//values that can be changed with the settings
var sec = 5;
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
var worker = document.getElementById('roundwork');
if(worker){
	worker.addEventListener("click", workTimer);
};

var breaker = document.getElementById('roundbreak');
if(breaker){
	breaker.addEventListener("click", breakTimer);
};

//executed detects which phase the timer is in
var executed = false;
var breakExecuted = false;

//global value for interval so we can stop them later
var intervalWork;
var intervalBreak;


function workTimer(){

	if(!executed){
		console.log(executed);
		executed = true;

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
				
				breakExecuted = false;
				breakTimer();
				stopWork();
				document.getElementById("roundwork").setAttribute("id", "roundbreak");
				console.log(executed);
			}

		}, 1000);

	} else {
		clearWork();
	}

}


function breakTimer(){
	if(!breakExecuted){
		breakExecuted = true;
		breakMinutes = bMinutes;
		breakSeconds = bSeconds;



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
				executed = false;
				workTimer();
				stopBreak();
				document.getElementById("roundbreak").setAttribute("id", "roundwork");
			}

		}, 1000); 
	} else if(!executed){
		clearBreak();
	}
}



//work pausing function
function clearWork(){
	clearInterval(intervalWork);
	seconds = workSeconds;
	executed= false;
}

function clearBreak(){
	clearInterval(intervalBreak);
	breakExecuted = false;
	workSeconds = sec;
}



function stopWork(){
	clearInterval(intervalWork);
	seconds = workSeconds;
}

function stopBreak(){
	clearInterval(intervalBreak);
	workSeconds = sec;
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