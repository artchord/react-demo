import { useSortable } from "@dnd-kit/react/sortable";

interface SortableProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

export default function Sortable({ id, index, children }: SortableProps) {
  const { ref } = useSortable({ id, index });

  return <div ref={ref}>{children}</div>;
}
