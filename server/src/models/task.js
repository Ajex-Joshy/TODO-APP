import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    taskName: {
      type: String,
      required: [true, "Task name is required"],
      minLength: [5, "Task name should have minimum 5 characters"],
      maxLength: [50, "Task name should not exceed 50 characters"],
    },
    description: {
      type: String,
      maxLength: [150, "Task name should not exceed 150 characters"],
      default: "",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("task", taskSchema);
