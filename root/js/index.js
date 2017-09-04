//Changes time into a managable number
function parseTime(time) {
	if (typeof time !== "string") {
		return "input is not a string";
	}
	var timeOfDay, period;
	//Checking period aka suffix aka am or pm and if it is a time of day or just a time
	//am check
	if (time.substring(time.length - 2, time.length) === "am") {
		timeOfDay = true;
		period = "am";
		//pm check
	} else if (time.substring(time.length - 2, time.length) === "pm") {
		timeOfDay = true;
		period = "pm";
		//if not am or pm it must just be a time
	} else {
		timeOfDay = false;
		period = "no";
	}
	//Checking for colon and saving it's location
	for (i = 0; time.length + 1 > i; i++) {
		if (time.charAt(i) === ":") {
			var colonLocation = i;
			break;
		} else if (i === time.length) {
			var colonLocation = false;
		}
	}
	//Grabbing the numbers to the left of the colon and converting it to minutes
	if (colonLocation === false) {
		return "Colon missing";
	} else {
		var hours = time.substring(0, colonLocation);
		//If hours are 12 and it is a time of day, it is equal to 0 because it would be the next period
		if (hours == 12 && timeOfDay) {
			hours = 0;
		}
		var totalTime = hours * 60;

		//Adding numbers to the right of the colon and adding to the total
		if (timeOfDay) {
			totalTime += parseInt(time.substring(colonLocation + 1, time.length - 2));
		} else {
			totalTime += parseInt(time.substring(colonLocation + 1, time.length));
		}

		//Adding correct time for pm
		if (period === "pm") {
			totalTime += 720;
		}

		return totalTime;
	}
}

//To convert a given number of time to a time of day
function timeOfDay(time) {
	//If the number is negative, reset from a full day and count backward by the time
	while (time < 0) {
		time = 1440 + time;
	}
	//Removes days to leave the time of that day, 1440 min in a day
	while (time >= 1440) {
		time -= 1440;
	}
	if (time >= 720) {
		time -= 720;
		var period = "pm";
	} else {
		var period = "am";
	}
	//Finding hours and min, making them into a correct form
	var hours = Math.floor(time / 60);
	if (hours === 0) {
		hours = 12;
	}
	var min = String(time % 60);
	if (min.length === 1) {
		min = "0" + min;
	}
	//Returns time
	return hours + ":" + min + period;
}

function addTimes(time1, time2) {
	return timeOfDay(parseTime(time1) + parseTime(time2));
}

function subtractTimes(time1, time2) {
	return timeOfDay(parseTime(time1) - parseTime(time2));
}

alert(addTimes("1:00am","9:00"));

/*
alert("6:30am".substring("6:30am".length - 2, "6:30am".length));

var time = "6:30am";
if (time.substring(time.length - 2, time.length) === "am") {
	alert("indeed it is")
} */


/*
//Collecting info about their current sleep, plan on changing later, primitive now

var range1 = prompt("RANGE1 What is the earliest time you normally go to bed? \n Ex: \"10pm write '10'\"");

alert(range1);

var range2 = prompt("RANGE2 What is the latest time you normally go to bed? \n Ex: 11pm, write '11' or 1am, write 1");

alert(range2);

var maxWake = prompt("MAXWAKE What is the latest time you HAVE to be up by? \n 6:30am, write 6:30");

alert(maxWake);

var age = prompt("AGE How old are you?");

alert(age);

//Using the age to determine how much sleep  they should be getting
var recCycles;
if (age <= 1) {
	alert("How are you able to use this computer?");
	recCycles = 10;
} else if (age <= 5) {
	recCycles = 8;
} else if (age <= 13) {
	recCycles = 7;
} else if (age <= 17) {
	recCycles = 6;
} else {
	recCycles = 5;
}

alert(recCycles);

//Finding times to fall asleep
var fallAsleepBy = [0];

var temp = maxWake - ((recCycles + 1) * 90);
fallAsleepBy.push(temp);

alert(fallAsleepBy[1]);
*/
