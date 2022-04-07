const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBoss: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    about: {
      type: String,
      max: 50,
    },
    bio: {
      type: String,
      default: "PICTian",
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    skills: {
      type: String,
    },
    achievements: {
      type: String,
    },
    github: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    certifications: {
      type: Array,
      default: [],
      title: {
        type: String,
      },
      desc: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    projects: {
      type: Array,
      default: [],
      title: {
        type: String,
      },
      desc: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    experience: {
      type: Array,
      default: [],
      title: {
        type: String,
      },
      span: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateJWT = function(){
  const token = jwt.sign({
    _id: this._id,
    number: this.number
  }, process.env.JWT_SECRET_KEY
  )
}

module.exports = mongoose.model("User", UserSchema);
