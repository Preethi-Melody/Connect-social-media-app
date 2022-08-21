const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The post must belong to a username']
    },
    slug:String,
    postedAt: {
        type: Date,
        required: [true, 'The post must contain PostedAt']
    },
    likeCount: {
        type: Number,
    },
    comments: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    

});
postSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "parentId",
});
  
postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId",
});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;