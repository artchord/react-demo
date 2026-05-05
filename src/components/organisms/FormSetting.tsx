import Droppable from "@components/organisms/Droppable";
import { Box, Stack, Typography } from "@mui/material";
import type { FormField } from "@type/formItem";
import Sortable from "@components/organisms/Sortable";
import useFormItem from "@hooks/useFormItem";
interface FormSettingProps {
  id: string;
  formFields: FormField[];
  isActive?: boolean;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
}

export default function FormSetting({
  id,
  formFields,
  isActive,
  selectedFieldId,
  setSelectedFieldId,
}: FormSettingProps) {
  const { itemTemplates } = useFormItem();

  return (
    <Droppable id={id} isActive={isActive}>
      {formFields.length === 0 ? (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center", py: 4 }}
        >
          左からフォーム要素をドラッグしてドロップしてください
        </Typography>
      ) : (
        <Stack>
          {formFields.map((field, index) => (
            <Sortable key={field.id} id={field.id} index={index}>
              <Box
                onClick={() => setSelectedFieldId(field.id)}
                sx={{
                  p: 2,
                  mx: 2,
                  mb: 1,
                  border: "1px solid",
                  borderColor:
                    selectedFieldId === field.id ? "primary.main" : "divider",
                  borderRadius: 1,
                  bgcolor:
                    selectedFieldId === field.id
                      ? "action.selected"
                      : "background.paper",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <Typography variant="subtitle2">
                  {field.label}
                  {field.required && (
                    <span style={{ color: "red", marginLeft: 4 }}>*</span>
                  )}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {itemTemplates[field.type]?.label}
                </Typography>
              </Box>
            </Sortable>
          ))}
        </Stack>
      )}
    </Droppable>
  );
}
