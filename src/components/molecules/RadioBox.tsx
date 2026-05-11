import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { FormField } from "@type/formItem";

interface Props {
  item?: FormField;
}

export default function RadioBox({ item }: Props) {
  const { label, required } = item?.settings ?? {};
  return (
    <FormControl required={required}>
      <FormLabel required={required}>{label}</FormLabel>
      <RadioGroup>
        {item?.childItems?.map((childItem) => (
          <FormControlLabel
            key={childItem.settings.value}
            value={childItem.settings.value}
            control={<Radio />}
            label={childItem.settings.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
