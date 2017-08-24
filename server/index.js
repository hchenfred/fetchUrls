var util = require('./utility');
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
  rp(url)
  .then((htmlString) => {
      redisClient.set(job.id, htmlString, (err, res) => {
        console.log(`job ${job.id} done`);
        done();
      });
  })
  .catch(function (err) {
      // Crawling failed...
      console.error(`${job.id} failed`);
  });
});

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/urls', (req, res) => {
  let url = req.body.url;
  if (!util.isValidUrl(url)) {
    res.status(404).json({error: 'url entered is not valid'});
  } else {
    let job = queue.create('urls', {
        title:  `fetch html from ${url}`,
        url
    }).save( function(err){
      if( !err ) {
        res.status(200).json({jobId: job.id});
      }
    });
  }
});

app.get('/urls/:id', (req, res) => {
  const jobId = req.params.id;
  kue.Job.get(jobId, (err, job) => {
    if (!err) {
      console.log(job._state);
      if (job._state === 'complete') {
        redisClient.get(jobId, function(err, result) {
          if (!err) {
            res.send(JSON.stringify(result));
          }
        });
      } else {
        res.send(JSON.stringify('job is not completed yet'));
      }  
    } else {
      res.send(JSON.stringify('job does not exist'));
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

