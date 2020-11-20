const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();

app.use(cors());
app.use(express.static("./files/"));
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.post('/send_message', (req, res) => {

    /* const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.GMAIL_LOGIN,
            pass: process.env.GMAIL_PASSWORD
        }
    })); */

    const { email, message } = req.body;

    /* const mailOptions = {
        from: process.env.GMAIL_LOGIN,
        to: process.env.RECEIVER,
        subject: 'Nouveau message !',
        message: `Nouveau message from ${email}: ${message}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); */

    res.status(200).send(email, message);
})

app.listen(process.env.PORT);