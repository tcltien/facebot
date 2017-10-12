const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(process.env.PORT || 5000, () => {
	console.log('Express server listening on port %d in %s mode', server.address().port,
app.settings.env);
});


app.get('/webhook', (req, res) => {
	if (req.query['hub.name'] && req.query['hub.verify_token'] == 'tienlebot') {
		res.status(200).send(req.query['hub.challenge']);
	} else {
		res.status(200).send('Not using hub token');
	}
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});