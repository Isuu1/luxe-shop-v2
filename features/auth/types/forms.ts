import { ZodFormattedError } from "zod";

export type SignupFormState = {
  error:
    | string
    | null
    | ZodFormattedError<{ email: string; password: string }, string>;
  success: boolean;
  data: {
    email: string | "";
    password: string | "";
    confirmPassword: string | "";
  };
  status: number;
  resetKey?: number;
};
