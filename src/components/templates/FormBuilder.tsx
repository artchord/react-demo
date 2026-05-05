import FormItem from "@components/organisms/FormItem";
import FormSetting from "@components/organisms/FormSetting";
import { Grid, Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  DragDropProvider,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/react";
import { useState, useCallback } from "react";
import { FormField, FormItemType } from "@type/formItem";
import useFormItem from "@hooks/useFormItem";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isDragOverDropZone, setIsDragOverDropZone] = useState(false);
  const { itemTemplates } = useFormItem();
  console.log("formFields", formFields);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragOverDropZone(false);
      console.log("event", event);

      if (event.canceled) return;

      const target = event.operation.target;

      // ドロップ領域がなければ中断
      if (!target) return;

      const source = event.operation.source;
      if (!source) return;

      const itemType = String(source.id) as FormItemType;

      if (itemTemplates[itemType]) {
        const newField: FormField = {
          id: `${itemType}-${Date.now()}`,
          type: itemType,
          label: itemTemplates[itemType].label,
          placeholder: "",
          required: false,
        };
        setFormFields((prev) => [...prev, newField]);
        setSelectedFieldId(newField.id);
      }
    },
    [itemTemplates],
  );

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  const handleDeleteField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const selectedField = formFields.find((f) => f.id === selectedFieldId);

  return (
    <DragDropProvider
      sensors={[PointerSensor]}
      onDragOver={(event) => {
        setIsDragOverDropZone(!!event.operation.target);
      }}
      onDragEnd={handleDragEnd}
    >
      <Grid container spacing={2} sx={{ height: "calc(100% - 48px)" }}>
        {/* 左側：フォーム要素 */}
        <Grid size={{ xs: 6, md: 3 }}>
          <FormItem />
        </Grid>

        {/* 右側：フォーム編集エリア */}
        <Grid size={{ xs: 6, md: 9 }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            {/* フォームプレビュー */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                border: "2px dashed",
                borderColor: isDragOverDropZone ? "primary.main" : "divider",
                borderRadius: 1,
                bgcolor: isDragOverDropZone
                  ? "action.hover"
                  : "background.paper",
                overflow: "auto",
                transition: "all 0.2s ease",
              }}
            >
              <FormSetting id="droppable" isActive={isDragOverDropZone}>
                {formFields.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    左からフォーム要素をドラッグしてドロップしてください
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {formFields.map((field) => (
                      <Box
                        key={field.id}
                        onClick={() => setSelectedFieldId(field.id)}
                        sx={{
                          p: 2,
                          border: "1px solid",
                          borderColor:
                            selectedFieldId === field.id
                              ? "primary.main"
                              : "divider",
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
                            <span style={{ color: "red", marginLeft: 4 }}>
                              *
                            </span>
                          )}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {itemTemplates[field.type]?.label}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </FormSetting>
            </Box>

            {/* フィールド設定パネル */}
            {selectedField && (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  フィールド設定
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    label="ラベル"
                    value={selectedField.label}
                    onChange={(e) =>
                      handleUpdateField(selectedField.id, {
                        label: e.target.value,
                      })
                    }
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="プレースホルダー"
                    value={selectedField.placeholder ?? ""}
                    onChange={(e) =>
                      handleUpdateField(selectedField.id, {
                        placeholder: e.target.value,
                      })
                    }
                    fullWidth
                    size="small"
                  />
                  <Box>
                    <input
                      type="checkbox"
                      checked={selectedField.required ?? false}
                      onChange={(e) =>
                        handleUpdateField(selectedField.id, {
                          required: e.target.checked,
                        })
                      }
                      id={`required-${selectedField.id}`}
                    />
                    <label
                      htmlFor={`required-${selectedField.id}`}
                      style={{ marginLeft: 8 }}
                    >
                      必須項目
                    </label>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteField(selectedField.id)}
                  >
                    削除
                  </Button>
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </DragDropProvider>
  );
}
