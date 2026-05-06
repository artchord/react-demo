import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FormField } from "@type/formItem";

interface FormSettingDialogProps {
  open: boolean;
  field: FormField | undefined;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
  onDelete: (id: string) => void;
}

export default function FormSettingDialog({
  open,
  field,
  onClose,
  onUpdate,
  onDelete,
}: FormSettingDialogProps) {
  return (
    <Dialog
      open={open && !!field}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>フィールド設定</DialogTitle>
      <DialogContent>
        {field && (
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="ラベル"
              value={field.label}
              onChange={(e) => onUpdate(field.id, { label: e.target.value })}
              fullWidth
              size="small"
            />
            <TextField
              label="プレースホルダー"
              value={field.placeholder ?? ""}
              onChange={(e) =>
                onUpdate(field.id, { placeholder: e.target.value })
              }
              fullWidth
              size="small"
            />
            <Box>
              <input
                type="checkbox"
                checked={field.required ?? false}
                onChange={(e) =>
                  onUpdate(field.id, { required: e.target.checked })
                }
                id={`required-${field.id}`}
              />
              <label htmlFor={`required-${field.id}`} style={{ marginLeft: 8 }}>
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
          onClick={() => field && onDelete(field.id)}
        >
          削除
        </Button>
        <Button onClick={onClose} variant="contained">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
