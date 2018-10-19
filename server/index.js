const express = require ('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

require ('dotenv').config();

const app = express();

app.use (morgan('tiny'));
app.use (cors());

app.get('/videos' ,(req, res) => {
  const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCtxJFU9DgUhfr2J2bveCHkQ&maxResults=50';
  fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(json => {
      res.json(json);
    });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}
 
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on Port: ', port);
});
