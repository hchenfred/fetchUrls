var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());


app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/urls', (req, res) => {
  console.log('entered post request', req.body.url);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

