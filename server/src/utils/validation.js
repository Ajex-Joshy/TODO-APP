import validator from "validator";

export const validateRegisterData = (req) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword)
    throw new Error("All fields are required");
  if (firstName.length <= 3 || firstName.length > 50)
    throw new Error("First name should contain 3 - 50 character");
  if (lastName.length <= 3 || lastName.length > 50)
    throw new Error("First name should contain 3 - 50 character");
  if (!validator.isEmail(email)) throw new Error("Enter a valid email id");
  if (password !== confirmPassword) throw new Error("Passwords do not match");
  if (!validator.isStrongPassword(password))
    throw new Error("Enter a strong password");
};

export const validateTask = (req) => {
  const { taskName, description, dueDate } = req.body;
  if (!taskName || !dueDate) throw new Error("Missing task name or due date");
  if (taskName.length < 5 || taskName.length > 50)
    throw new Error("Task name should contain 5 - 15 characters");
  if (description && description.length > 150)
    throw new Error("Description should not exceed 150 characters");
  if (
    !validator.isDate(dueDate, { format: "YYYY-MM-DD", strictMode: true }) ||
    new Date(dueDate) < new Date(new Date().toISOString().split("T")[0])
  )
    throw new Error("Enter a valid date");
};
