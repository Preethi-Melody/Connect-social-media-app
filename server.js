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