import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { FormField } from "@type/formItem";

interface Props {
  item?: FormField;
  selectedValue?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioBox({
  item,
  selectedValue = "1",
  handleChange,
}: Props) {
  const { label, required } = item?.settings ?? {};
  return (
    <FormControl required={required} error={required && !selectedValue}>
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
      <RadioGroup>
        {item?.childItems?.map((childItem) => (
          <FormControlLabel
            key={childItem.settings.value}
            value={childItem.settings.value}
            control={<Radio onChange={handleChange} />}
            label={childItem.settings.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText sx={{ color: "red" }}>
        {required && !selectedValue ? "必須項目です" : ""}
      </FormHelperText>
    </FormControl>
  );
}
