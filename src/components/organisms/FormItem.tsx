import { Box, Typography, Stack } from "@mui/material";
import Draggable from "@components/organisms/Draggable";
import useFormItem from "@hooks/useFormItem";

export default function FormItem() {
  const { itemTemplates } = useFormItem();
  const items = Object.entries(itemTemplates);

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        height: "100%",
        overflow: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        フォーム要素
      </Typography>
      <Stack spacing={1}>
        {items.map(([key, { label, icon }]) => (
          <Draggable key={key} id={key} icon={icon}>
            {label}
          </Draggable>
        ))}
      </Stack>
    </Box>
  );
}
