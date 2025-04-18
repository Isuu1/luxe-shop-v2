export type ChangeDetailsFormState = {
  data: { email: string; username: string };
  error: string | null;
  success: boolean;
  resetKey: number;
};
