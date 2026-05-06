import FormItem from "@components/organisms/FormItem";
import FormSetting from "@components/organisms/FormSetting";
import {
  Grid,
  Box,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  DragDropProvider,
  DragOverEvent,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [isDraggingTemplate, setIsDraggingTemplate] = useState(false);
  const [isDragOverDropZone, setIsDragOverDropZone] = useState(false);
  const { itemTemplates } = useFormItem();

  const selectedField = useMemo(
    () => formFields.find((f) => f.id === selectedFieldId),
    [formFields, selectedFieldId],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragOverDropZone(false);
      setIsDraggingTemplate(false);
      setDragOverId(null);

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

  function handleUpdateField(id: string, updates: Partial<FormField>) {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  }

  function handleDeleteField(id: string) {
    setFormFields(formFields.filter((field) => field.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
    setIsModalOpen(false);
  }

  function handleSettingsClick(id: string) {
    setSelectedFieldId(id);
    setIsModalOpen(true);
  }

  function handleDragOver(event: DragOverEvent) {
    // ドラッグ開始時の判定
    const sourceId = String(event.operation.source?.id);
    if (itemTemplates[sourceId as FormItemType]) {
      setIsDraggingTemplate(true);
    }
    const targetId = event.operation.target?.id;
    setIsDragOverDropZone(!!targetId);
    setDragOverId(targetId ? String(targetId) : null);
  }

  return (
    <DragDropProvider
      sensors={[PointerSensor]}
      onDragOver={handleDragOver}
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
              dragOverId={dragOverId}
              isDraggingTemplate={isDraggingTemplate}
              setSelectedFieldId={setSelectedFieldId}
              selectedFieldId={selectedFieldId}
              formFields={formFields}
              onSettingsClick={handleSettingsClick}
            />

            {/* フィールド設定モーダル */}
            <Dialog
              open={isModalOpen && !!selectedField}
              onClose={() => setIsModalOpen(false)}
              maxWidth="sm"
              fullWidth
              disableRestoreFocus
            >
              <DialogTitle>フィールド設定</DialogTitle>
              <DialogContent>
                {selectedField && (
                  <Stack spacing={2} sx={{ pt: 1 }}>
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
                  </Stack>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() =>
                    selectedField && handleDeleteField(selectedField.id)
                  }
                >
                  削除
                </Button>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="contained"
                >
                  閉じる
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Grid>
      </Grid>
    </DragDropProvider>
  );
}
