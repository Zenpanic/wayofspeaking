const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static("files"));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./files/index.html');
})

app.post('/send_message', (req, res) => {
    res.json("Message Sent!");
})

app.listen(process.env.PORT);