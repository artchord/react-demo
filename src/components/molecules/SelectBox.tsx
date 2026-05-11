import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {
  type SelectChangeEvent,
  type BaseSelectProps,
} from "@mui/material/Select";
import { FormLabel } from "@mui/material";
import type { FormField } from "@type/formItem";

interface Props {
  item?: FormField;
  selectedValue?: string;
  handleChange?: (event: SelectChangeEvent) => void;
  size?: BaseSelectProps["size"];
}

export default function SelectBox({
  item,
  selectedValue = "1",
  handleChange,
  size = "small",
}: Props) {
  const id = React.useId();
  const { label = "", required = false } = item?.settings ?? {};
  return (
    <FormControl fullWidth required={required}>
      <FormLabel required={required}>{label}</FormLabel>
      <Select
        labelId={`${id}-select-label`}
        id={`${id}-select`}
        value={selectedValue}
        required={required}
        onChange={handleChange}
        size={size}
      >
        {item?.childItems?.map((childItems) => (
          <MenuItem
            key={childItems.settings.value}
            value={childItems.settings.value}
          >
            {childItems.settings.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
