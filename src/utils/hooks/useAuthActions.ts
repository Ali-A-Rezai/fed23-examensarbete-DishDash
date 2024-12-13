import { useState } from "react";
import { SignupFormValues, LoginFormValues } from "../../types/form";

const useAuthAction = (navigate: (path: string) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (asyncFunction: () => Promise<void>) => {
    try {
      setLoading(true);
      setError(null);
      await asyncFunction();
      setLoading(false);
      navigate("/profile");
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return { loading, error, handleRequest };
};

export const useAuthActions = (
  signup: (data: SignupFormValues) => Promise<void>,
  loginWithGoogle: () => Promise<void>,
  navigate: (path: string) => void
) => {
  const { loading, error, handleRequest } = useAuthAction(navigate);

  const handleSignup = async (data: SignupFormValues): Promise<void> => {
    await handleRequest(() => signup(data));
  };

  const handleGoogleSignup = async (): Promise<void> => {
    await handleRequest(() => loginWithGoogle());
  };

  return { loading, error, handleSignup, handleGoogleSignup };
};

export const useLoginActions = (
  login: (data: LoginFormValues) => Promise<void>,
  loginWithGoogle: () => Promise<void>,
  navigate: (path: string) => void
) => {
  const { loading, error, handleRequest } = useAuthAction(navigate);

  const handleLogin = async (data: LoginFormValues): Promise<void> => {
    await handleRequest(() => login(data));
  };

  const handleGoogleLogin = async (): Promise<void> => {
    await handleRequest(() => loginWithGoogle());
  };

  return { loading, error, handleLogin, handleGoogleLogin };
};
