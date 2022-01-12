export function stringToObj(data, elemdelimiter = ",", keyValDelimiter = ":") {
    let y = {};
    data.split(elemdelimiter).map(function (i) {
        return i.split(keyValDelimiter)
    }).forEach(function (j) {
        y[j[0].trim()] = j[1]
    });
    return y;
}

export function objToSerialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export function convertJSDateTimeToMySQLDateTime(str) {
    let date = new Date(str);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    let mySQLDate = [date.getFullYear(), month, day].join("-");
    let mySQLTime = [hours, minutes, seconds].join(":");
    return [mySQLDate, mySQLTime].join(" ");
}

export function convertTimeZone(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}