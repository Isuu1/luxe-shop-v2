import { ZodFormattedError } from "zod";

//Function to normalize error messages to keep the same format: Array of strings
export function normalizeErrors(
  errors:
    | string
    | ZodFormattedError<{ email: string; password: string }, string>
) {
  if (!errors) return []; // If there are no errors, return an empty array.

  // If errors is already an array (simple case), filter and return only string messages.
  if (Array.isArray(errors)) {
    return errors.filter((msg) => typeof msg === "string");
  }

  // If errors is an object (like { password: { _errors: [...] } })
  if (typeof errors === "object") {
    return Object.values(errors) // Extract all object values (e.g., {password: {...}} → [{_errors: [...]}])
      .flatMap((field) => (Array.isArray(field) ? field : field._errors || [])) // Ensure we access _errors safely. // Get `_errors` array from each field (or empty array if missing)
      .filter((msg) => typeof msg === "string"); // Ensure only string messages are included.
  }

  return [errors]; // Default case (shouldn't happen, but safe fallback)
}
