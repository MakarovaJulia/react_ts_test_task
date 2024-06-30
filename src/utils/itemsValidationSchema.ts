import * as Yup from 'yup';

export const itemsValidationSchema = Yup.object({
  name: Yup.string()
    .min(1, "The name length cannot be less than 1 character")
    .max(50, "The name length cannot be more than 50 characters")
    .required("Enter name"),
  description: Yup.string()
    .min(1, "The description length cannot be less than 1 character")
    .max(1000, "The description length cannot be more than 1000 characters")
    .required("Enter description"),
  price: Yup.number()
    .min(1, "Price cannot be less than 1")
    .required("Enter price"),
});
