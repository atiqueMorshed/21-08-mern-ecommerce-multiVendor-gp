import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  userType: {
    type: String,
    required: true,
    default: "user",
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },

  isReLoginConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
