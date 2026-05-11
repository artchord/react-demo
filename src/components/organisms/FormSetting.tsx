import Droppable from "@components/organisms/Droppable";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import type { FormField } from "@type/formItem";
import Sortable from "@components/organisms/Sortable";
import useFormBuilder from "@hooks/useFormBuilder";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

interface FormSettingProps {
  id: string;
  formFields: FormField[];
  onSettingsClick: (id: string) => void;
}

interface itemBoxProps {
  onSettingsClick?: () => void;
  onChildSettingsClick?: (id: string) => void;
  field: FormField;
}

function ItemBox({
  onSettingsClick,
  onChildSettingsClick,
  field,
}: itemBoxProps) {
  const { formComponents } = useFormBuilder();

  return (
    <Box
      sx={{
        p: 2,
        mx: 2,
        mb: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Box sx={{ flex: 1, pointerEvents: field.type === "group" ? "auto" : "none" }}>
        {React.cloneElement(formComponents[field.type], {
          item: field,
          fullWidth: true,
          onSettingsClick: onChildSettingsClick,
        })}
      </Box>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onSettingsClick?.();
        }}
        sx={{ ml: 1, flexShrink: 0 }}
      >
        <SettingsIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function FormSetting({
  id,
  formFields,
  onSettingsClick,
}: FormSettingProps) {
  return (
    <Droppable id={id}>
      {formFields.length === 0 ? (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center", py: 4 }}
        >
          フォーム要素をドラッグしてドロップしてください
        </Typography>
      ) : (
        <Stack>
          {formFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Sortable id={field.id} index={index}>
                <ItemBox
                  onSettingsClick={() => onSettingsClick(field.id)}
                  onChildSettingsClick={onSettingsClick}
                  field={field}
                />
              </Sortable>
            </React.Fragment>
          ))}
        </Stack>
      )}
    </Droppable>
  );
}


