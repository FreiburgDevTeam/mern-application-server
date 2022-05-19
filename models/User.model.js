const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    
    },
    passwordHash: {
    password: String,
    required: [true, "Password is required"]
    },
  },  
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
