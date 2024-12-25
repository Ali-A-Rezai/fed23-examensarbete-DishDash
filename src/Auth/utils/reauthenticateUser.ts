import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from "firebase/auth";

export const reauthenticateUser = async (
  user: User,
  oldPassword: string,
  email: string
) => {
  const credential = EmailAuthProvider.credential(email, oldPassword);
  try {
    await reauthenticateWithCredential(user, credential);
    return null;
  } catch (error) {
    return error;
  }
};

export const getErrorMessage = (error: string) => {
  const errorMessages: { [key: string]: string } = {
    "auth/wrong-password":
      "The current password you entered is incorrect. Please try again.",
    "auth/weak-password":
      "Your new password is too weak. Please choose a stronger one.",
    "auth/network-request-failed":
      "Network error. Please check your connection and try again.",
    "auth/invalid-credential":
      "The current password you entered is incorrect. Please try again.",
  };
  return errorMessages[error] || "An error occurred. Please try again.";
};
