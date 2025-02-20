import { z } from "zod";

// ✅ Schema validation với required fields
export const FormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long." })
    .nonempty({ message: "Phone number is required." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .nonempty({ message: "Password is required." }),
});
