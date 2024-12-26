import { useState } from "react";
import { FormErrors, SignupFormValues } from "../types/form";
import { validatePassword } from "../utils/password-validator";

const useFormState = () => {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (name: keyof SignupFormValues, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formValues.firstName) errors.firstName = "First name is required";
    if (!formValues.lastName) errors.lastName = "Last name is required";
    if (!formValues.email) errors.email = "Email is required";

    const { isValid, errorMessage } = validatePassword(formValues.password);
    if (!isValid) errors.password = errorMessage;

    if (formValues.password !== formValues.confirmPassword)
      errors.confirmPassword = "Passwords must match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { formValues, formErrors, handleChange, validateForm };
};

export default useFormState;
