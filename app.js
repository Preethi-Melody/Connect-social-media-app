
const express = require('express');
const morgan = require('morgan');
const path=require('path')
const rateLimit=require('express-rate-limit')
const helmet=require('require')
const mongoSanitize=require('express-mongo-sanitize')
const xss= require('xss-clean')
const hpp=require('hpp');
const cookieParser=require('cookie-parser');
const speakeasy = require('speakeasy');
const compression=require('compression');
const cors=require('cors');

const AppError=require('./utils/appError');
const globalErrorHandler=require('./controllers/errorControllers');
const postRouter=require('./routes/postRoutes');
const userRouter=require('./routes/userRoutes');



const app = express();

app.enable('trust proxy');

app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

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
// -----------------

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());


app.use(mongoSanitize());

app.use(xss());
// Preventing parameter pollution
//------------------
// app.use(
//   hpp({
//     whitelist: ['', ''],
//   })
// );
// //------------------
app.use(compression());

//ROUTES
app.get('/api/v1/').get(authController.feed);//usercontroller
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/settings', authController.protected,userController.getMe);

//Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
