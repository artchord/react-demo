import {
  type BaseTextFieldProps,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import type { FormField } from "@type/formItem";

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
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <FormLabel required={required}>{label}</FormLabel>
      <TextField multiline rows={3} size={size} placeholder={placeholder} />
    </FormControl>
  );
}
