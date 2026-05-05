import FormItem from "@components/organisms/FormItem";
import FormSetting from "@components/organisms/FormSetting";
import { Grid, Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  DragDropProvider,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/react";
import { useState, useCallback, useMemo } from "react";
import { FormField, FormItemType } from "@type/formItem";
import useFormItem from "@hooks/useFormItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { isSortable } from "@dnd-kit/react/sortable";

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isDragOverDropZone, setIsDragOverDropZone] = useState(false);
  const { itemTemplates } = useFormItem();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragOverDropZone(false);

      if (event.canceled) return;

      const { source, target } = event.operation;

      if (!source || !target) return;

      const sourceId = String(source.id) as FormItemType;
      const targetId = String(target.id) as FormItemType;

      // 新規アイテムの追加（左側のパレットからのドラッグ）
      if (itemTemplates[sourceId]) {
        const itemType = sourceId;
        const newField: FormField = {
          id: `${itemType}-${Date.now()}`,
          type: itemType,
          label: itemTemplates[itemType].label,
          placeholder: "",
          required: false,
        };

        setFormFields((prev) => {
          const overIndex = prev.findIndex((f) => f.id === targetId);
          if (overIndex !== -1) {
            // 既存のフィールドの上にドロップされた場合、その位置に挿入
            const updated = [...prev];
            updated.splice(overIndex, 0, newField);
            return updated;
          }
          // コンテナ自体（ID: "droppable"）にドロップされた場合は末尾に追加
          return [...prev, newField];
        });
        setSelectedFieldId(newField.id);
      } else {
        // 既存アイテムの並び替え
        if (isSortable(source)) {
          setFormFields((prev) => {
            const oldIndex = source.initialIndex;
            const newIndex = source.index;
            if (oldIndex !== -1 && newIndex !== -1) {
              const updated = [...prev];
              const [movedItem] = updated.splice(oldIndex, 1);
              updated.splice(newIndex, 0, movedItem);
              return updated;
            }
            return prev;
          });
        }
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

  const selectedField = useMemo(
    () => formFields.find((f) => f.id === selectedFieldId),
    [formFields, selectedFieldId],
  );

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
          <Stack spacing={1} sx={{ height: "100%" }}>
            {/* フォームプレビュー */}
            <FormSetting
              id="droppable"
              isActive={isDragOverDropZone}
              setSelectedFieldId={setSelectedFieldId}
              selectedFieldId={selectedFieldId}
              formFields={formFields}
            />

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
