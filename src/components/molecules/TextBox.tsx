import {
  FormControl,
  FormLabel,
  TextField,
  type BaseTextFieldProps,
} from "@mui/material";
import type { FormField } from "@type/formItem";

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
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <FormLabel required={required}>{label}</FormLabel>
      <TextField size={size} type={type} placeholder={placeholder} />
    </FormControl>
  );
}
