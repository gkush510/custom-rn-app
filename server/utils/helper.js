const fs = require('fs');
const myTimeZoneLogs = "Asia/Kolkata";

exports.searchArraykeyValueIndex = (key, value, myArray) => {
	for (var i = 0; i < myArray.length; i++) {
		if (myArray[i][key] === value) {
			return i;
		}
	}
	return null;
}

exports.searchArraykeyValue = (key, value, myArray) => {
	for (var i = 0; i < myArray.length; i++) {
		if (myArray[i][key] === value) {
			return myArray[i];
		}
	}
	return [];
}

exports.stringToObj = (data, elemdelimiter = ",", keyValDelimiter = ":") => {
	let y = {};
	data.split(elemdelimiter).map(function (i) {
		return i.split(keyValDelimiter)
	}).forEach(function (j) {
		y[j[0].trim()] = j[1]
	});
	return y;
}

exports.getPaginatedItemsLodash = (items, page, dataLimit) => {
	let pg = page || 1,
		pgSize = dataLimit || 100,
		offset = (pg - 1) * pgSize,
		pagedItems = lodash.drop(items, offset).slice(0, pgSize);
	return {
		page: parseInt(pg),
		dataLimit: parseInt(dataLimit),
		total_items: items.length,
		total_pages: Math.ceil(items.length / pgSize),
		data: pagedItems
	};
}

exports.timeDiffCalc = (endDate, startDate) => {
	let dateFuture = new Date(endDate);
	let dateNow = new Date(startDate);


	let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
	// calculate days
	const days = Math.floor(diffInMilliSeconds / 86400);
	diffInMilliSeconds -= days * 86400;
	//console.log('calculated days', days);

	// calculate hours
	const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
	diffInMilliSeconds -= hours * 3600;
	//console.log('calculated hours', hours);

	// calculate minutes
	const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
	diffInMilliSeconds -= minutes * 60;
	//console.log('minutes', minutes);

	let duration = {};


	let difference = '';
	if (days > 0) {
		difference += (days === 1) ? `${days} day, ` : `${days} days, `;
	}
	difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
	difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

	duration.days = days;
	duration.hours = hours;
	duration.minutes = minutes;
	return duration;
	//return difference;
}

function convertJSDateTimeToMySQLDateTime (str){

	let date = new Date(str);
	let monthN = ("0" + (date.getMonth() + 1)).slice(-2);
	let dayN = ("0" + date.getDate()).slice(-2);
	let hoursN = ("0" + date.getHours()).slice(-2);
	let minutesN = ("0" + date.getMinutes()).slice(-2);
	let secondsN = ("0" + date.getSeconds()).slice(-2);

	let mySQLDate = [date.getFullYear(), monthN, dayN].join("-");
	let mySQLTime = [hoursN, minutesN, secondsN].join(":");
	return [mySQLDate, mySQLTime].join(" ");
}

function convertJSDateTimeToCreatorDateTime (str) {
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let date = new Date(str);
	let monthN = monthNames[date.getMonth()];
	let dayN = ("0" + date.getDate()).slice(-2);
	let hoursN = ("0" + date.getHours()).slice(-2);
	let minutesN = ("0" + date.getMinutes()).slice(-2);
	let secondsN = ("0" + date.getSeconds()).slice(-2);

	let mySQLDate = [dayN, monthN, date.getFullYear()].join("-");
	let mySQLTime = [hoursN, minutesN, secondsN].join(":");
	return [mySQLDate, mySQLTime].join(" ");

}

function convertTimeZone(date, tzString) {
	return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

exports.convertJSDateTimeToMySQLDateTime = convertJSDateTimeToMySQLDateTime;
exports.convertJSDateTimeToCreatorDateTime = convertJSDateTimeToCreatorDateTime;
exports.convertTimeZone = convertTimeZone;

exports.insertLog = (filePath, data) => {
	let currentTime = convertJSDateTimeToMySQLDateTime(convertTimeZone(new Date(), myTimeZoneLogs));
	let finalLog = "["+currentTime+"]: "+ data+"\n";
	fs.appendFileSync(filePath,finalLog, 'utf8', function (err) {
		if (err) {
			console.log("Error in insert log data filePath:"+filePath+" "+data);
			
		}
	});
	return currentTime;
}