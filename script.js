
//values that can be changed with the settings


setWorkSec = 0;
setWorkMin = 25;
setBreakSec = 0;
setBreakMin = 5;


//values used in functions

var minutes = 25;
var seconds = 0;
var bMinutes = 5;
var bSeconds = 0;

//values for the timer use only
var breakMinutes = bMinutes;
var breakSeconds = bSeconds;
var workMinutes = minutes;
var workSeconds = seconds;




//settings
//click detectors

var worker = document.getElementById('roundwork');

var breaker = document.getElementById('roundbreak');



var restart = document.getElementById('restart');
if(restart){
	restart.addEventListener("click", reset);
}

var downWork = document.getElementById('downWork');
if(downWork){
	downWork.addEventListener("click", workDown);
}


var upWork = document.getElementById('upWork');
if(upWork){
	upWork.addEventListener("click", workUp);
}

var downBreak = document.getElementById('downBreak');
if(downBreak){
	downBreak.addEventListener("click", breakDown);
}

var upBreak = document.getElementById('upBreak');
if(upBreak){
	upBreak.addEventListener("click", breakUp);
}

var settable = true;
var paused = true;


function workDown(){
	if(setWorkMin > 1 && settable){
		setWorkMin--;
		workMinutes = setWorkMin;
		workSeconds = setWorkSec;
		document.getElementById('displayWork').innerHTML = setWorkMin;
			if(paused){
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
		}
			
	}
}


function workUp(){
	if(setWorkMin >= 1 && settable){
		setWorkMin++;
		workMinutes = setWorkMin;
		workSeconds = setWorkSec;
		document.getElementById('displayWork').innerHTML = setWorkMin;
		if(paused){
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
		}
		
	} else{
		console.log('err');
	}
}


function breakDown(){
	if(setBreakMin > 1 && !breakExecuted){
		setBreakMin--;
		breakMinutes = setBreakMin;
		breakSeconds = setBreakSec;

		document.getElementById('displayBreak').innerHTML = setBreakMin;
		if(paused){
			
			document.getElementById('timer').innerHTML = breakMinutes + ':' + breakSeconds;
			if(breakSeconds < 10){
				document.getElementById('timer').innerHTML = breakMinutes + ':' + '0' + breakSeconds;
			}
			if(breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +breakMinutes + ':' + breakSeconds;
			}

			if(breakSeconds < 10 && breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' + breakMinutes + ':' + '0' + breakSeconds;
			}
		}
		
	
		}
	}


function breakUp(){
	if(setBreakMin >= 1 && !breakExecuted){
		setBreakMin++;	
		breakMinutes = setBreakMin;
		breakSeconds = setBreakSec;
		document.getElementById('displayBreak').innerHTML = setBreakMin;
		if(paused){
			
			document.getElementById('timer').innerHTML = breakMinutes + ':' + breakSeconds;
			if(breakSeconds < 10){
				document.getElementById('timer').innerHTML = breakMinutes + ':' + '0' + breakSeconds;
			}
			if(breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +breakMinutes + ':' + breakSeconds;
			}

			if(breakSeconds < 10 && breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' + breakMinutes + ':' + '0' + breakSeconds;
			}
		}
	}
}

function reset(){
	window.location.reload();
}




//click detector

 
if(worker){
	worker.addEventListener("click", workTimer);
} else if(breaker){
	breaker.addEventListener("click", breakTimer);
};


// TODO Alarm sound




//executed detects which phase the timer is in
var executed = false;
var breakExecuted = false;

//global value for interval so we can stop them later
var intervalWork;
var intervalBreak;

//checking if the values are the same
if(workSeconds !== setWorkSec || workMinutes !== setWorkMin){
	workSeconds = setWorkSec;
	workMinutes = setWorkMin;
}	


function workTimer(){

	if(!executed){
		executed = true;
		settable = false;
		paused = false;

		document.getElementById('timer').innerHTML = 'WORK';


		intervalWork = setInterval(function(){
			
			
			if(workSeconds == 0){
				workMinutes--;
				workSeconds = 60;
			}
			workSeconds--;
			document.getElementById('timer').innerHTML = workMinutes + ':' + workSeconds;
			document.title = '(' + workMinutes + ':' + workSeconds + ') Work | Pomodoro Timer';
			if(workSeconds < 10){
				document.getElementById('timer').innerHTML = workMinutes + ':' + '0' + workSeconds;
				document.title = "(" + workMinutes + ":" + "0" + workSeconds + ") Work | Pomodoro Timer"
			}
			if(workMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +workMinutes + ':' + workSeconds;
				document.title = "(0" + workMinutes + ":" + workSeconds + ") Work | Pomodoro Timer"
			}

			if(workSeconds < 10 && workMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +workMinutes + ':' + '0' + workSeconds;
				document.title = "(0" + workMinutes + ":" + "0" + workSeconds + ") Work | Pomodoro Timer"
			}
			if(workMinutes == 0 && workSeconds == 0){
				document.getElementById("roundwork").setAttribute("id", "roundbreak");
				breakExecuted = false;
				breakTimer();
				stopWork();
				
			}

		}, 1000);

	} else {
		clearWork();
	}

}


function breakTimer(){
	if(!breakExecuted){
		breakExecuted = true;
		settable = true;
		paused = false;
		//making sure we start from the 'settings' time

		document.getElementById('timer').innerHTML = 'BREAK';
		intervalBreak = setInterval(function(){
			document.title = '(' + breakMinutes + ':' + breakSeconds + ') Break | Pomodoro Timer';
			if(breakSeconds == 0){
				breakMinutes--;
				breakSeconds = 60;
			}
			breakSeconds--;
			document.title = '(' + breakMinutes + ':' + breakSeconds + ') Break | Pomodoro Timer';
			document.getElementById('timer').innerHTML = breakMinutes + ':' + breakSeconds;
			if(breakSeconds < 10){
				document.getElementById('timer').innerHTML = breakMinutes + ':' + '0' + breakSeconds;
			}
			if(breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +breakMinutes + ':' + breakSeconds;
			}

			if(breakSeconds < 10 && breakMinutes < 10){
				document.getElementById('timer').innerHTML = '0' +breakMinutes + ':' + '0' + breakSeconds;
				document.title = "(0" + breakMinutes + ":" + "0" + breakSeconds + ") Break | Pomodoro Timer"
			}
			if(breakMinutes == 0 && breakSeconds == 0){
				executed = false;

				stopBreak();
				workTimer();
				document.getElementById("roundbreak").setAttribute("id", "roundwork");
			}

		}, 1000); 
	} else if(breakExecuted){
		clearBreak();
	}
}



//work pausing function
function clearWork(){
	clearInterval(intervalWork);
	seconds = workSeconds;
	executed= false;
	settable = true;
	paused = true;
	document.getElementById('timer').innerHTML = 'PAUSED';
}

function clearBreak(){
	clearInterval(intervalBreak);
	bSeconds = breakSeconds;
	breakExecuted = false;
	paused = true;
	document.getElementById('timer').innerHTML = 'PAUSED';
	
}



function stopWork(){
	clearInterval(intervalWork);
	seconds = setWorkSec;
	minutes = setWorkMin;
	workSeconds = seconds;
	workMinutes = minutes;
	executed = true;
	settable = true;
	worker.removeEventListener('click', workTimer);
	worker.addEventListener('click', breakTimer);
}

function stopBreak(){
	clearInterval(intervalBreak);
	bSeconds = setBreakSec;
	bMinutes = setBreakMin;
	breakSeconds = bSeconds;
	breakMinutes = bMinutes;
	worker.removeEventListener('click', breakTimer);
	worker.addEventListener('click', workTimer);
}


//starter timer on windows load
function setTime(){
	minutes = setWorkMin;
	seconds = setWorkSec;
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


function setBTime(){
	if(intervalBreak){
		bMinutes = setBreakMin;
		bSeconds = setBreakSec;	
		document.getElementById('timer').innerHTML = bMinutes + ':' + bSeconds;
		if(bSeconds < 10){
			document.getElementById('timer').innerHTML = bMinutes + ':' + '0' + bSeconds;
		}
		if(minutes < 10){
			document.getElementById('timer').innerHTML = '0' +bMinutes + ':' + bSeconds;
		}

		if(bSeconds < 10 && bMinutes < 10){
			document.getElementById('timer').innerHTML = '0' + bMinutes + ':' + '0' + bSeconds;
		}
	}
}

window.onload = setTime();