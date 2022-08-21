const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    upVote: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

voteSchema.index({ parentId: 1, createdBy: 1 }, { unique: true });

const Like = mongoose.model("Vote", likeSchema);

module.exports = Like;