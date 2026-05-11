import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Button } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { FormItemTemplate } from "@hooks/useFormBuilder";

interface DraggableProps {
  children: React.ReactNode;
  item: FormItemTemplate;
}

export default function Draggable({ children, item }: DraggableProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      getInitialData: () => ({ id: item.id, type: "template" }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [item.id]);

  return (
    <Button
      ref={ref}
      variant="outlined"
      startIcon={item.icon}
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
  );
}
