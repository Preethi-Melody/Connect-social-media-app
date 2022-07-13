const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const apiLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //1hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', apiLimiter);

const createAccountLimiter = rateLimit({
  max: 5,
  windowMs: 365 * 24 * 60 * 60 * 1000,
  message: 'Too many accounts created from this IP, please try again later.',
});
// ----------------
app.post('/signup', createAccountLimiter, authController.signup);
//-----------------

//Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Preventing parameter pollution
//------------------
app.use(
  hpp({
    whitelist: ['', ''],
  })
);
//------------------

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postsRouter);

//Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
