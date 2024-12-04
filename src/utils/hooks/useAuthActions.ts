import { useState } from "react";
import { SignupFormValues, LoginFormValues } from "../../types/form";

export const useAuthActions = (
  signup: (data: SignupFormValues) => Promise<void>,
  loginWithGoogle: () => Promise<void>,
  navigate: (path: string) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRequest = async (
    asyncFunction: () => Promise<void>,
    successMessage: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await asyncFunction();
      setLoading(false);
      setSuccessMessage(successMessage);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: unknown) {
      setLoading(false);
      setSuccessMessage(null);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleSignup = async (data: SignupFormValues): Promise<void> => {
    await handleRequest(() => signup(data), "Signup successful!");
  };

  const handleGoogleSignup = async (): Promise<void> => {
    await handleRequest(() => loginWithGoogle(), "Google Signup successful!");
  };

  return { loading, error, successMessage, handleSignup, handleGoogleSignup };
};

export const useLoginActions = (
  login: (data: LoginFormValues) => Promise<void>,
  loginWithGoogle: () => Promise<void>,
  navigate: (path: string) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRequest = async (
    asyncFunction: () => Promise<void>,
    successMessage: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await asyncFunction();
      setLoading(false);
      setSuccessMessage(successMessage);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: unknown) {
      setLoading(false);
      setSuccessMessage(null);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleLogin = async (data: LoginFormValues): Promise<void> => {
    await handleRequest(() => login(data), "Login successful!");
  };

  const handleGoogleLogin = async (): Promise<void> => {
    await handleRequest(() => loginWithGoogle(), "Google Login successful!");
  };

  return { loading, error, successMessage, handleLogin, handleGoogleLogin };
};
