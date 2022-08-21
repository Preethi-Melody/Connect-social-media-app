const Comment = require('../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createComment = catchAsync(async (req, res, next) => {
    const user = req.user._id;
    const { comment } = req.body;
    const newComment = await (Comment.create({
        createdBy: user,
        parentId: req.params.id,
        body: comment,
    }));
    res.send(201).json({
        status: "success",
        message: "Comment created Successfully",
        comment:newComment,
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const user = req.user._id;
    const comment = await Comment.findById(req.params.id).populate({
        path: "parentId",
        select: "createdBy",
        model: "Post",
    });
    if (!comment) {
        return next(new AppError("Comment not found", 404));
    }
    if (user != comment.createdBy && user !== comment.parentId.createdBy) {
        return next(new AppError("Cannot delete the post", 403));
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", message: "Comment deleted successfully" });
});
