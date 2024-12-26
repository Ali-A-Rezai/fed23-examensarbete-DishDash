import React from "react";
import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string | undefined;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  helperText,
  autoComplete = "on",
}) => (
  <TextField
    label={label}
    type={type}
    fullWidth
    sx={{ mb: 2 }}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    autoComplete={autoComplete}
  />
);

export default InputField;
