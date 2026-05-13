import {
  type BaseTextFieldProps,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import type { FormField } from "@type/formItem";
import { useState } from "react";

interface Props {
  item?: FormField;
  fullWidth?: boolean;
  size?: BaseTextFieldProps["size"];
}

export default function TextareaBox({
  item,
  fullWidth = false,
  size = "small",
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
        multiline
        rows={3}
        size={size}
        placeholder={placeholder}
        required={required}
        error={error}
        helperText={error ? "必須項目です" : ""}
        onChange={handleChange}
      />
    </FormControl>
  );
}
