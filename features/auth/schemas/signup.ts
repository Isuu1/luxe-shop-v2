import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, {
      message: "Username must be at most 20 characters long",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must include at least one number" }),
});
