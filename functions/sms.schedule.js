var  cron = require('node-cron');
var SMSAPI = require('smsapi');

var day,msg,number;

    smsapi = new SMSAPI({
        oauth: {
            accessToken: process.env.AUTHTOKEN,
        }
    });

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}

function sendMessage(number, message){
    return smsapi.message
        .sms()
        .from('Alert')
        .to(number)
        .message(message)
        .execute(); // return Promise
}

function daysUntill() {
    var date1, date2;
    date1 = new Date();
    date2 = Date.parse(day);
    var res = Math.abs(date1 - date2) / 1000;
    var days = Math.floor(res / 86400);
    return days;
}
var task = cron.schedule("* * * * *", () => {
    if(daysUntill() === 0) {
        sendMessage(number, "WOW! IT'S TODAY DUDE !")
        task.stop()
    } else {
        sendMessage(number, msg + " " +  daysUntill() + " days left")
            .then(displayResult)
            .catch(displayError);
    }
}, {
    scheduled: false
});

module.exports = function (data) {
    day = data.date;
    msg = data.message;
    number = data.number;
    task.start()
}
