module.exports=fn=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
};

//what does it do?
