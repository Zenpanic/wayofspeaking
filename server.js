const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'user.gmail',
        pass: 'user.password'
    }
}));

app.use(cors());
app.use(express.static("/files/"));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.post('/send_message', (req, res) => {
    res.json("Message Sent!");
})

app.listen(process.env.PORT);