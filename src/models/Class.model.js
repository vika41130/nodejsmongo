import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Classes",
  new Schema({
    id: { type: Schema.ObjectId },
    name: {
      type: String,
      validate: {
        validator: (value) => value.length >= 4,
        message: "Class name must be at least 4 characters.",
      },
    },
  })
);
