var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const foods = require('./routes/api/v1/foods')
const meals = require('./routes/api/v1/meals')
const recipes = require('./routes/api/v1/recipes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/foods', foods);
app.use('/api/v1/meals', meals)
app.use('/api/v1/search_foods', recipes)

module.exports = app;
