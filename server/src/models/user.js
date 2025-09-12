import mongoose, { Mongoose } from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "First name should contain minimum 3 character"],
      maxLength: [50, "First name cannot exceed 50 characters"],
      required: [true, "First name is required"],
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error("First name should only contain alphabets");
      },
    },
    lastName: {
      type: String,
      minLength: [3, "Last name should contain minimum 3 character"],
      maxLength: [50, "Last name cannot exceed 50 characters"],
      required: [true, "Last name is required"],
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error("Last name should only contain alphabets");
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already exists with this email id"],
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Enter a valid email id");
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Enter a strong password");
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
