import { ZodFormattedError } from "zod";

export type ChangeDetailsFormState = {
  data: { email: string; username: string };
  error: string | null;
  success: boolean;
  resetKey: number;
};

export type ChangePasswordFormState = {
  data: { newPassword: string; confirmPassword: string };
  error:
    | string
    | null
    | ZodFormattedError<{ password: string; confirmPassword: string }, string>;
  success: boolean;
  resetKey: number;
};
