import Droppable from "@components/organisms/Droppable";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import type { FormField } from "@type/formItem";
import Sortable from "@components/organisms/Sortable";
import useFormItem from "@hooks/useFormItem";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
interface FormSettingProps {
  id: string;
  dragOverId: string | null;
  formFields: FormField[];
  isDraggingTemplate: boolean;
  isActive?: boolean;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  onSettingsClick: (id: string) => void;
}

interface itemBoxProps {
  onClick?: () => void;
  onSettingsClick?: () => void;
  field: FormField;
  selectedFieldId: string | null;
}

function ItemBox({
  onClick,
  onSettingsClick,
  field,
  selectedFieldId,
}: itemBoxProps) {
  const { itemTemplates } = useFormItem();

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        mx: 2,
        mb: 1,
        border: "1px solid",
        borderColor: selectedFieldId === field.id ? "primary.main" : "divider",
        borderRadius: 1,
        bgcolor:
          selectedFieldId === field.id ? "action.selected" : "background.paper",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
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

/**
 * 挿入位置を示す青いライン
 */
const DropIndicator = () => (
  <Box
    sx={{
      position: "absolute",
      top: -6, // 要素の少し上に表示
      left: 0,
      right: 0,
      height: "4px",
      bgcolor: "primary.main",
      borderRadius: "2px",
      zIndex: 10,
      pointerEvents: "none",
      mx: 1,
    }}
  />
);

export default function FormSetting({
  id,
  dragOverId,
  formFields,
  isActive,
  isDraggingTemplate,
  selectedFieldId,
  setSelectedFieldId,
  onSettingsClick,
}: FormSettingProps) {
  return (
    <Droppable id={id} isActive={isActive}>
      {formFields.length === 0 ? (
        <Sortable id="defaultId" index={0}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            左からフォーム要素をドラッグしてドロップしてください
          </Typography>
        </Sortable>
      ) : (
        <Stack>
          {formFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Sortable id={field.id} index={index}>
                <Box sx={{ position: "relative" }}>
                  {isDraggingTemplate && dragOverId === field.id && (
                    <DropIndicator />
                  )}
                  <ItemBox
                    onClick={() => setSelectedFieldId(field.id)}
                    onSettingsClick={() => onSettingsClick(field.id)}
                    field={field}
                    selectedFieldId={selectedFieldId}
                  />
                </Box>
              </Sortable>
            </React.Fragment>
          ))}

          {/* リストの末尾にドラッグされている、または空のエリアにドラッグされている場合 */}
          {isDraggingTemplate && dragOverId === id && formFields.length > 0 && (
            <Box sx={{ position: "relative" }}>
              <DropIndicator />
            </Box>
          )}
        </Stack>
      )}
    </Droppable>
  );
}
