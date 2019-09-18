var schedule_sms = require('../functions/sms.schedule')

exports.sms_send = function(req,res,next) {


    var sms = {
        date : req.body.date,
        message: req.body.message,
        number: req.body.number
    }
    if(Date.parse(sms.date) < new Date()) {
        res.send('Date must be in future !');
    } else if (sms.number.length < 9){
        res.send('Number is too short')
    } else {
        schedule_sms(sms)
        res.send('Your event has been scheduled!')
    }

}