var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const  mongoose = require('mongoose');
require("./models/category");//cau hinh
require("./models/SINHVIEN")
require("./models/user") 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var objectRouter = require('./routes/object');
var categoryRouter = require('./routes/category');
var databaseRouter = require('./routes/database');
var SINHVIENRouter = require('./routes/SINHVIEN');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb://localhost:27017/AND1033') 
mongoose.connect('mongodb+srv://hau501194:B35v4QxbbstwRaWA@haufpoly.dpzpabn.mongodb.net/AND103') 
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


//http://localhost:3000/hihi2
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/object', objectRouter);
app.use('/category', categoryRouter);
app.use('/database', databaseRouter);
app.use('/SINHVIEN',SINHVIENRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
