const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();

app.use(cors());
app.use(express.static("./files/"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.GMAIL_LOGIN,
        pass: process.env.GMAIL_PASSWORD
    }
}));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.post('/sendMessage', (req, res) => {

    /* const { email, message } = req.body; */

    const email = req.body.email;
    const message = req.body.message;

    const mailOptions = {
        from: process.env.GMAIL_LOGIN,
        to: process.env.RECEIVER,
        subject: 'Nouveau message !',
        message: JSON.stringify(message)
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log(email);

    res.redirect('/');
})

app.listen(process.env.PORT);