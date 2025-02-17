import { z } from "zod";

// ✅ Schema validation với required fields
export const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .nonempty({ message: "Email is required." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .nonempty({ message: "Password is required." }),
});
