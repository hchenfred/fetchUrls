var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var rp = require('request-promise');
var redis = require("redis");
var redisClient = redis.createClient();
var kue = require('kue');
var queue = kue.createQueue();
queue.watchStuckJobs(6000);
queue.process('urls', function(job, done){
  let url = job.data.url;
  console.log('hello', url);
  rp('http://www.google.com')
  .then((htmlString) => {
      // Process html..
      console.log(htmlString);
      redisClient.set(job.id, htmlString, (err, res) => {
        console.log(job.id + 'done');
        done();
      });
  })
  .catch(function (err) {
      // Crawling failed...
  });
});

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/urls', (req, res) => {
  let url = req.body.url;
  let job = queue.create('urls', {
      title:  `fetch html from ${url}`,
      url
  }).save( function(err){
    if( !err ) {
      res.status(200).json({jobId: job.id});
    }
  });
});

app.get('/urls/:id', (req, res) => {
  const jobId = req.params.id;
  console.log(jobId);
  kue.Job.get(jobId, (err, job) => {
    console.log(job._state);
  });
  redisClient.get(jobId, function(err, result) {
    if (!err) {
      res.send(JSON.stringify(result));
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

