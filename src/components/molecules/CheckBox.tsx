import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import type { FormField } from "@type/formItem";

interface Props {
  item?: FormField;
  selectedValues?: string[];
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({
  item,
  selectedValues = [],
  handleChange,
}: Props) {
  const { label, required } = item?.settings ?? {};
  return (
    <FormControl required={required}>
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
      <FormGroup>
        {item?.childItems?.map((childItem) => (
          <FormControlLabel
            key={childItem.settings.value}
            value={childItem.settings.value}
            control={<Checkbox onChange={handleChange} />}
            label={childItem.settings.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
