const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    port: 25,
    auth: {
        user:"aayushgamot.shivinfotech@gmail.com",
        pass: "aayush@174"
    }
})


const OTPsend = (email, otp) => {
    console.log(email);
    console.log(otp);
    let mailSend = {
        to: email,
        subject: "OTP for new Password",
        html: "<h3>OTP for new password "  + "<b>" + " " + otp + "</b>"
    }

    let mailSends = transport.sendMail(mailSend, function (error) {
        if (error) {
console.log("error",error);
        }
        else{
console.log('email is senad');
        }
    })
    return mailSends;
};
module.exports = {
    OTPsend

};

