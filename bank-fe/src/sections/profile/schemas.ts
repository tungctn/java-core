import * as z from "zod";

export const ProfileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  avatar: z.string().optional(),
}); 