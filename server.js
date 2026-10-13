const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "jogmaya123";
const PORT = process.env.PORT || 3000;

// For WhatsApp Verification
app.get('/webhook', (req, res) => {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Home Page
app.get('/', (req, res) => {
  res.send('Jogmaya AI Bridge is Running! Jai Jogmaya!');
});

// Receive Message
app.post('/webhook', async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  let body = req.body;
  if (body.object) {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
       let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
       let from = body.entry[0].changes[0].value.messages[0].from;
       let msg_body = body.entry[0].changes[0].value.messages[0].text.body;
       console.log(`Message from ${from}: ${msg_body}`);
       // Here you will connect to Meta AI later
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
