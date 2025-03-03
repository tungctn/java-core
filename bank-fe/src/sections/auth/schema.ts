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

export const FormSchemaRegister = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long." })
    .nonempty({ message: "Phone number is required." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .nonempty({ message: "Password is required." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .nonempty({ message: "Email is required." }),
  confirmPassword: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .nonempty({ message: "Password is required." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .nonempty({ message: "First name is required." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .nonempty({ message: "Last name is required." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Hiển thị lỗi ở field confirmPassword
});
