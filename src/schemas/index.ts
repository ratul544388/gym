import { Gender } from "@prisma/client";
import * as z from "zod";

export const MemberSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot be more than 50 characters in length" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must contain 11 digits" })
    .max(11, { message: "Phone number must contain 11 digits" }),
  email: z.string().max(60, { message: "Email length is very high" }),
  address: z
    .string()
    .min(5, { message: "Address is too short" })
    .max(70, { message: "Address is too long" }),
  age: z.coerce
    .number({
      required_error: "phone is required",
      invalid_type_error: "Phone is required",
    })
    .min(8, { message: "Minimum age must be 8 years" })
    .max(100, { message: "Maximum age must be 100 years" }),
  gender: z.nativeEnum(Gender, {
    required_error: "Gender is required",
    invalid_type_error: "Gender is required",
  }),
  image: z.string(),
  startDate: z.date({
    invalid_type_error: "Joining date is missing",
    required_error: "Joining date is missing",
  }),
});

export const MembershipPlanSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot be more than 50 characters in length" }),
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
  benefitIds: z.array(z.string()),
});

export const MembershipBenefitSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot be more than 100 characters in length" }),
});

export const AdmissionFeeSchema = z.object({
  admissionFee: z.coerce
    .number()
    .min(300, { message: "Admission Fee can not be less than 300 BDT." })
    .max(3000, { message: "Admission Fee can not be higher than 3000 BDT." }),
});
