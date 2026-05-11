import { FormLabel } from "@mui/material";
import { FormField } from "@type/formItem";
import FormSetting from "@components/organisms/FormSetting";

interface Props {
  item?: FormField;
  onSettingsClick?: (id: string) => void;
}

export default function GroupBox({ item, onSettingsClick }: Props) {
  if (!onSettingsClick) return <></>;
  return (
    <>
      <FormLabel>{item?.settings.label}</FormLabel>
      <FormSetting
        id={`droppable-${item?.id}`}
        formFields={item?.childItems ?? []}
        onSettingsClick={onSettingsClick}
      />
    </>
  );
}
