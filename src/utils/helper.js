const { totp } = require("otplib");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// async function sendOtp(number, params) {
//     try {
//     const response = await messagebird.verify.create(number, {
//         originator : 'Code',
//         template : `Your verification code is %token.`
//     });
//     res.status(200).send(response);
//     console.log(response);
//     } catch (error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// }


async function sendMailOtp(recipient) {
    const otpcode = totp.generate(process.env.OTP_SECRET);
    const msg = {
        to: recipient,
        from: "Szack4477@gmail.com",
        subject: "Email verification",
        html: `<p>Welcome new user. Enter <strong>${otpcode}</strong> as your verification code</p>`
    }
    try {
    await sgMail.send(msg)
    console.log("Email succesfully sent");
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    sendMailOtp,
}

