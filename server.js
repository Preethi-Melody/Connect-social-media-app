const mongoose = require('mongooose');
const dotenv = require('dotenv');

process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name,err.message);
    process.exit(1);
})

dotenv.config({path:'./config.env'});
const app = require('./app');

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORDS);

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('DB connection succesful!')
})

var secret = speakeasy.generateSecret({ length: 20 });
user.twoFA = secret.base32;

var QRCode = require('qrcode');
QRCode.toDataURL(secret.oypath_url, (err, data_url) => {
    // console.log(data_url);
    write('<img src="' + data_url + '">');
});
var userToken = req.body.token;
var base32secret = user.twoFA;
var verified = speakeasy.totp.verify({ secret: base32secret, encoding: 'base32', token: userToken });
user.twoFA_secret = user.twoFA;
user.twoFA_enabled = true;

var token = speakeasy.totp({
    secret: secret.base32,
    encoding:'base32',
})

var tokenValidate = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: userToken,
    window: 5,
    
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection',err=>{
    console.log('UNHANDLED REJECTED! Shutting down...');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    })
});

process.on('SIGTERM',()=>{
    console.log('SIGTERM RECEIVED. Shutting down gracefully...');
    server.close(()=>{
        server.close(()=>{
            console.log('Process terminated!')
        })
    })
})

//uncaught exception
//server.close or similar 
//unhandled rejections
//mongoose.connect