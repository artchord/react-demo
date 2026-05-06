import { useDroppable } from "@dnd-kit/react";
import { Box } from "@mui/material";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function Droppable({ id, children, isActive }: DroppableProps) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: "100%",
        border: "2px dashed",
        borderColor: isActive ? "primary.main" : "divider",
        borderRadius: 1,
        py: 2,
        bgcolor: isActive ? "action.hover" : "background.paper",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </Box>
  );
}
