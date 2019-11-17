const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
// const { sequelize } = require('./models');
const expressLayout = require('express-ejs-layouts');
require('dotenv').config();

// arduino
// const { mainArduino } = require('./arduino')
// mainArduino();

// router
const indexRouter = require('./routes/index');

const app = express();
// sequelize.sync();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3001);

// express-ejs-layout settings
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.use(expressLayout);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false, // false => 요청이 왔을 때 수정 사항이 생기지 않으면 다시 저장 안함
  saveUninitialized: false, // false => 세션에 저장 사항이 생기지 않으면 다시 저장 안함
  secret: process.env.COOKIE_SECRET, // cookieParser 설정과 같게
  cookie: {
    httpOnly: true, // true => 쿠키 값이 클라이언트(브라우저)에서 볼 수 없음 => 서버에서만 확인 가능
    secure: false, // false => https가 아닌 환경에서도 사용 가능
  },
}));
app.use(flash());

app.use('/', indexRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});