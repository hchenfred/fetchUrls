## Introduction
  * this is a web application built with React (front-end) and Express (back-end)

## How to run the app?
  * run 'npm install' in terminal
  * run 'redis-server' in terminal
  * run 'npm run react-dev'
  * run 'npm run server-dev'
  * open you browser and type in "localhost:3000" 


## Implemented Features
  * use kue to create a job queue.
  * when user enters a url, client side will send a http request to the server and end point will check if the url entered is valid. If the url is not valid, it will respond with an error message ''url entered is not valid'. If the url is valid, a new job is created in the job queue and job id will be sent back to client.
  * when job queue receive a new job, it will process the job (fetching html content)
  * when user enters a job id, the server will check if the job exists. If it doesn't exist, it will respond with a message 'job does not exist'. If the job has not been completed, it will respond with a message 'job is not completed yet'. Otherwise, it will respond with the html content.
  * fetched html content is stored in Redis.


