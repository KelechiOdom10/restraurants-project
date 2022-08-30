const yup = require("yup");

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is a required field"),
  lastName: yup.string().required("Last Name is a required field"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Password must have a min length of 6"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

module.exports = { registerSchema, loginSchema };
