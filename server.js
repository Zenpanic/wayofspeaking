const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.static("./files/"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.post('/sendMessage', (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        secure: false,
        port: 2525,
        auth: {
            user: process.env.YAHOO_LOGIN,
            pass: process.env.YAHOO_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let { email, message } = req.body;

    let mailOptions = {
        from: "'Bot WayOfSpeaking' <bot.wayofspeaking@yahoo.com",
        to: process.env.RECEIVER,
        subject: 'Nouveau message !',
        text: `From: ${email} Message: ${message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/');
})

app.listen(process.env.PORT);