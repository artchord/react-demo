import { useDraggable, DragOverlay } from "@dnd-kit/react";
import { Button } from "@mui/material";
import { ReactNode } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  icon: ReactNode;
}

export default function Draggable({ id, children, icon }: DraggableProps) {
  const { ref, isDragging } = useDraggable({
    id,
  });

  return (
    <>
      <Button
        ref={ref}
        variant="outlined"
        startIcon={icon}
        fullWidth
        sx={{
          mb: 1,
          justifyContent: "flex-start",
          opacity: isDragging ? 0.5 : 1,
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
          "& .MuiButton-startIcon": { pointerEvents: "none" },
        }}
      >
        {children}
        <DragIndicatorIcon sx={{ ml: "auto", pointerEvents: "none" }} />
      </Button>

      {/* ドラッグ中の表示 */}
      {isDragging && (
        <DragOverlay>
          <Button
            variant="contained"
            startIcon={icon}
            fullWidth
            sx={{
              boxShadow: 3,
              justifyContent: "flex-start",
              cursor: "grabbing",
            }}
          >
            {children}
            <DragIndicatorIcon sx={{ ml: "auto" }} />
          </Button>
        </DragOverlay>
      )}
    </>
  );
}
