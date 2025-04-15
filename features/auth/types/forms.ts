import { ZodFormattedError } from "zod";

export type SignupFormState = {
  error:
    | string
    | null
    | ZodFormattedError<
        { email: string; username: string; password: string },
        string
      >;
  success: boolean;
  data: {
    email: string | "";
    username: string | "";
    password: string | "";
    confirmPassword: string | "";
  };
  status: number;
  resetKey?: number;
};

export type LoginFormState = {
  error: string | null;
  success: boolean;
  data: {
    email: string | "";
    password: string | "";
  };
  status: number;
  resetKey?: number;
};
