const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
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
    password: {
      type: String,
      required: [true, "Password is required"]
    },
  },  
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);


