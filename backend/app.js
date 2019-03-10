const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./api/config/database');
const port = 5000;
const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.database,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err, 'Database connection failed');
  });

app 
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors())
  .use(passport.initialize());

require('./api/auth/passport')(passport);

app
  .use('/api/users', require('./api/routes/userRoute'))
  .use('/api/travels', require('./api/routes/travelRoute'))
  .use('/api/ratings', require('./api/routes/ratingRoute'));


app.listen(port, (err) => {
  if(err) {
    console.log(err, 'Server connection failed');
  }

  console.log(`Server is open at port ${port}`);
});