import Droppable from "@components/organisms/Droppable";

export default function FormSetting({
  id,
  children,
  isActive,
}: {
  id: string;
  children?: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Droppable id={id} isActive={isActive}>
      {children}
    </Droppable>
  );
}
