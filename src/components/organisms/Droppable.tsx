import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box } from "@mui/material";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function Droppable({ id, children, isActive: defaultIsActive }: DroppableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: () => ({ id, type: "dropZone" }),
      onDragEnter: () => setIsDragOver(true),
      onDragLeave: () => setIsDragOver(false),
      onDrop: () => setIsDragOver(false),
    });
  }, [id]);

  const isActive = defaultIsActive ?? isDragOver;

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
