import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fs from 'fs'

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    let splittedAddress = process.env.CLIENT_ADDRESS.split(',')
    if (splittedAddress.length === 1) {
        res.header("Access-Control-Allow-Origin", process.env.CLIENT_ADDRESS);
    } else {
        // Assume array
        // Check if request array is on the list of allowed hosts
        let requestingOrigin = req.headers.origin
        if ( splittedAddress.filter( el => ( el === requestingOrigin ) ).length > 0 ) {
            // And then set it as the allowed requester
            res.header("Access-Control-Allow-Origin", requestingOrigin);
        }
    }

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Authorization, Authorization, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});


fs.readdirSync(__dirname + '/routes')
.forEach((file) => {
  if (file.indexOf('.') == 0 ) return;
  let route = require('./routes/' + file);
  if ( file === 'index.js') {
    app.use('/', route)
  } else {
    app.use("/"+file.substring(0, file.indexOf('.')), route)
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message)
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;