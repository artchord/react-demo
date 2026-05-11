import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import type { FormField } from "@type/formItem";

interface Props {
  item?: FormField;
}

export default function CheckBox({ item }: Props) {
  const { label, required } = item?.settings ?? {};
  return (
    <FormControl required={required}>
      <FormLabel required={required}>{label}</FormLabel>
      <FormGroup>
        {item?.childItems?.map((childItem) => (
          <FormControlLabel
            key={childItem.settings.value}
            value={childItem.settings.value}
            control={<Checkbox />}
            label={childItem.settings.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
