import { useEffect, useRef, useState } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { attachClosestEdge, extractClosestEdge, type Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";

interface SortableProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

export default function Sortable({ id, index, children }: SortableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ id, index, type: "sortable" }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input }) => {
          return attachClosestEdge(
            { id, index, type: "sortable" },
            { element: el, input, allowedEdges: ["top", "bottom"] }
          );
        },
        onDrag: ({ self, source }) => {
          if (source.data.id === id) {
            setClosestEdge(null);
            return;
          }
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      })
    );
  }, [id, index]);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, position: "relative" }}>
      {children}
      {closestEdge && <DropIndicator edge={closestEdge} gap="8px" />}
    </div>
  );
}

