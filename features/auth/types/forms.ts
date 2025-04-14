export type SignupFormState = {
  error: string | null;
  success: boolean;
  data: {
    email: string | "";
    password: string | "";
    confirmPassword: string | "";
  };
  status: number;
  resetKey?: number;
};
