import {
  FormControl,
  FormLabel,
  TextField,
  type BaseTextFieldProps,
} from "@mui/material";
import type { FormField } from "@type/formItem";
import { useState } from "react";

interface Props {
  item?: FormField;
  fullWidth?: boolean;
  size?: BaseTextFieldProps["size"];
  type?: BaseTextFieldProps["type"];
}

export default function TextBox({
  item,
  fullWidth = false,
  size = "small",
  type = "text",
}: Props) {
  const {
    label = "",
    required = false,
    placeholder = "",
  } = item?.settings ?? {};

  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (required && !value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <FormLabel
        required={required}
        sx={{
          "& .MuiFormLabel-asterisk": {
            color: "error.main",
          },
        }}
      >
        {label}
      </FormLabel>
      <TextField
        size={size}
        type={type}
        placeholder={placeholder}
        required={required}
        error={error}
        helperText={error ? "必須項目です" : ""}
        onChange={handleChange}
      />
    </FormControl>
  );
}
