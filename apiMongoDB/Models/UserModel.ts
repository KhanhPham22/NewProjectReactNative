
import mongoose, { Schema } from "mongoose";

export interface UserParams {
  firstName: string;
  email: string;
  password: string;
  mobileNo: string;
  createdAt?: Date;
}

const UserSchema = new Schema({
  firstName: {
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
  mobileNo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const USER = mongoose.model<UserParams>("User", UserSchema);
export { USER };