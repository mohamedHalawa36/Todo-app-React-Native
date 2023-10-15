import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8)
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&*()-_+=])[A-Za-z0-9!@#\$%^&*()-_+=]{8,}$/
    ,"password must have a capital letter and a number and a special character"),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8)
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&*()-_+=])[A-Za-z0-9!@#\$%^&*()-_+=]{8,}$/
    ,"password must have a capital letter and a number and a special character"),
  userName: yup
    .string()
    .typeError("user name should be a string")
    .required("user name is required"),
});
