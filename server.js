const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
/* const smtpTransport = require('nodemailer-smtp-transport');
 */
const app = express();

app.use(cors());
app.use(express.static("./files/"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    secure: false,
    service: 'yahoo',
    port: 587,
    auth: {
        user: process.env.GMAIL_LOGIN,
        pass: process.env.GMAIL_PASSWORD
    },
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.post('/sendMessage', (req, res) => {

    const { email, message } = req.body;

    let mailOptions = await transporter.sendMail({
        from: process.env.GMAIL_LOGIN,
        to: process.env.RECEIVER,
        subject: 'Nouveau message !',
        text: `From: ${email}
        Message: ${message}`
    });
    res.redirect('/');
})

app.listen(process.env.PORT);