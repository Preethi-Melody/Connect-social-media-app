const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Posts = require('../models/posts');

const popOptions = [
    {
        path: "createdBy",
        select: "firstname lastname img",
    },
    {
        path: "likes",
        select: "createdBy",
    },
    {
        path: "comments",
        populate: {
            path: "createdBy",
            select: "firstname lastname img",
        }
    }
];

//C

exports.createPost = catchAsync(async (req, res, next) => {
    const data = JSON.parse(JSON.stringify(req.body));
    let post = new Posts();
    const files = [];
  
    if (req.files) {
      req.files.forEach((file) => {
        files.push(file.filename);
      });
    }
  
    let caption = data.caption.toLowerCase().split(" ");
  
    post.caption = data.caption;
   
    post.image = files;
    post.createdBy = req.user?._id;
  
    await post.save();
  
    res.status(201).json({
      status: "success",
      post,
    });
});
  



//R
//posts/

exports.getAllPosts = catchAsync(async (req, res, next) => {
    let posts = await Posts.find().populate(popOptions).sort({ createdAt: -1 });
    res.status(200).json({
        status: "success",
        results: posts.length,
        posts,
    });
});

exports.deletePosts = catchAsync(async (req, res, next) => {
    const posts = await Posts.remove({ createdBy: req.user._id });
  
    if (!posts) {
      return next(
        new AppError(`No post found with id ${req.params.postId}`, 404)
      );
    }
  
    res.json({
      status: "success",
      posts: null,
    });
});

//posts/userid
exports.getMyPosts = catchAsync(async (req, res, next) => {
    let posts = await Posts.find({ createdBy: req.user._id }).populate(popOptions).sort({ createdAt: -1 });
    res.status(200).json({
        ststus: 'success',
        results: posts.length,
        posts,
    });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
    let posts = await Posts.find({ createdBy: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({
        status: 'success',
        results: posts.length,
        posts,
    });
});

