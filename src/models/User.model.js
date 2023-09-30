import mongoose, { Schema } from "mongoose";
import validator from "validator";

export default mongoose.model(
  "Users",
  new Schema({
    id: { type: Schema.ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length >= 3,
        message: "Name must be at least 3 characters.",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email is not valid.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  })
);
