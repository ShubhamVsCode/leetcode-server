import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Please use another title this title is already exists"],
    trim: true,
  },
  titleSlug: {
    type: String,
    required: true,
    unique: [
      true,
      "Please use another title-slug this title is already exists",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  tags: [
    {
      label: String,
      value: String,
    },
  ],
  examples: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explanation: {
        type: String,
      },
    },
  ],
  solutions: [
    {
      solution: String,
      upvote: {
        type: String,
        default: 0,
      },
      downvote: {
        type: String,
        default: 0,
      },
    },
  ],
  reaction: {
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  constraints: [
    {
      constraint: String,
    },
  ],
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
    },
  ],
});

ProblemSchema.pre("save", function (next) {
  this.titleSlug = this.title.toLowerCase().replace(/ /g, "-");
  console.log("Slug ", this.titleSlug);
  console.log("Title ", this.title);
  return next();
});

ProblemSchema.statics.findByIdOrTitle = function (identifier) {
  const Problem = this;
  return Problem.findOne({
    $or: [{ _id: identifier }, { title: identifier }],
  });
};

const Problem = mongoose.model("Problem", ProblemSchema);
export default Problem;
