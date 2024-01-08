import * as z from "zod";

export const MemberSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot be more than 50 characters in length" }),
  email: z.string().max(60, { message: "Email length is very high" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must contain 11 digits" })
    .max(11, { message: "Phone number must contain 11 digits" }),
  age: z.coerce
    .number({
      required_error: "phone is required",
      invalid_type_error: "Phone is required",
    })
    .min(8, { message: "Minimum age must be 8 years" })
    .max(100, { message: "Maximum age must be 100 years" }),
  image: z.string(),
  joiningDate: z.date({
    invalid_type_error: "Joining date is missing",
    required_error: "Joining date is missing",
  }),
});

export const MembershipPlanSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot be more than 50 characters in length" }),
  facilities: z.array(z.string()),
  durationInMonth: z.coerce.number(),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price is required",
    })
    .min(500, {
      message: "Ensure the price is within the range of 500 to 20,000 DBT.",
    })
    .max(20000, {
      message: "Ensure the price is within the range of 500 to 20,000 DBT.",
    }),
});
