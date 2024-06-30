import * as Yup from 'yup';

export const messageValidationSchema = Yup.object({
  message: Yup.string()
    .min(1, "The message length cannot be less than 1 character")
    .max(500, "The message length cannot be more than 500 characters")
    .required("Enter message"),
});
