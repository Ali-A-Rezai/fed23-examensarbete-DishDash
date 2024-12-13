export const validatePassword = (
  password: string
): { isValid: boolean; errorMessage: string } => {
  if (!password)
    return { isValid: false, errorMessage: "Password is required" };
  if (password.length < 8)
    return {
      isValid: false,
      errorMessage: "Password must be at least 8 characters long",
    };
  if (!/[a-z]/.test(password))
    return {
      isValid: false,
      errorMessage: "Password must contain at least one lowercase letter",
    };
  if (!/[A-Z]/.test(password))
    return {
      isValid: false,
      errorMessage: "Password must contain at least one uppercase letter",
    };
  if (!/\d/.test(password))
    return {
      isValid: false,
      errorMessage: "Password must contain at least one number",
    };
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return {
      isValid: false,
      errorMessage: "Password must contain at least one special character",
    };

  return { isValid: true, errorMessage: "" };
};
