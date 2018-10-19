const express = require ('express');
const cors = require('cors');
const morgan = require('morgan');

require ('dotenv').config();

const app = express();

app.use (morgan('tiny'));
app.use (cors());

app.get('/videos' ,(req, res) => {
  res.json([]);
});

function notFound(res, req, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(error, res, req, next) {
  res.status(res.statusCode|| 500);
  res.json({
    message: error.message
  });
};
 
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on Port: ', port);
});
