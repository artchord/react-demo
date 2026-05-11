import FormItem from "@components/organisms/FormItem";
import FormSetting from "@components/organisms/FormSetting";
import FormSettingDialog from "@components/organisms/FormSettingDialog";
import { Grid, Stack } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { FormField, FormItemType } from "@type/formItem";
import useFormBuilder from "@hooks/useFormBuilder";

type Operation =
  | { type: "append"; targetId: string }
  | { type: "insertBefore"; targetId: string }
  | { type: "insertAfter"; targetId: string };

function mutateTree(
  tree: FormField[],
  itemToMoveOrInsert: FormField,
  operation: Operation,
  sourceIdToRemove?: string,
): FormField[] {
  const remove = (items: FormField[]): FormField[] => {
    return items
      .filter((item) => item.id !== sourceIdToRemove)
      .map((item) => ({
        ...item,
        childItems: item.childItems ? remove(item.childItems) : item.childItems,
      }));
  };

  const currentTree = sourceIdToRemove ? remove(tree) : tree;

  const insert = (items: FormField[]): FormField[] => {
    const result: FormField[] = [];
    for (const item of items) {
      if (operation.type === "append" && item.id === operation.targetId) {
        result.push({
          ...item,
          childItems: [...(item.childItems ?? []), itemToMoveOrInsert],
        });
      } else if (
        operation.type === "insertBefore" &&
        item.id === operation.targetId
      ) {
        result.push(itemToMoveOrInsert);
        result.push(item);
      } else if (
        operation.type === "insertAfter" &&
        item.id === operation.targetId
      ) {
        result.push(item);
        result.push(itemToMoveOrInsert);
      } else {
        result.push({
          ...item,
          childItems: item.childItems
            ? insert(item.childItems)
            : item.childItems,
        });
      }
    }
    return result;
  };

  if (operation.type === "append" && operation.targetId === "droppable") {
    return [...currentTree, itemToMoveOrInsert];
  }
  return insert(currentTree);
}

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { itemTemplates, getDefaultItem } = useFormBuilder();

  const selectedField = useMemo(() => {
    if (!selectedFieldId) return undefined;
    let found: FormField | undefined;
    const findItem = (items: FormField[]) => {
      for (const item of items) {
        if (item.id === selectedFieldId) {
          found = item;
          return;
        }
        if (item.childItems) findItem(item.childItems);
      }
    };
    findItem(formFields);
    return found;
  }, [formFields, selectedFieldId]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const targets = location.current.dropTargets;
        if (targets.length === 0) return;

        const target = targets[0];
        const sourceId = String(source.data.id) as FormItemType;
        const targetId = String(target.data.id);

        let operation: Operation;
        if (target.data.type === "sortable") {
          const edge = extractClosestEdge(target.data);
          operation = {
            type: edge === "top" ? "insertBefore" : "insertAfter",
            targetId,
          };
        } else {
          const groupId = targetId.replace("droppable-", "");
          operation = {
            type: "append",
            targetId: targetId === "droppable" ? "droppable" : groupId,
          };
        }

        if (source.data.type === "template") {
          const itemType = sourceId;
          const newField: FormField = {
            ...getDefaultItem(itemType, itemTemplates[itemType].settings.label),
            id: `${itemType}-${Date.now()}`,
          };

          setFormFields((prev) => mutateTree(prev, newField, operation));
          setSelectedFieldId(newField.id);
        } else if (source.data.type === "sortable") {
          if (sourceId === targetId || sourceId === operation.targetId) return;

          setFormFields((prev) => {
            let movedItem: FormField | undefined;
            let isDescendant = false;

            const find = (items: FormField[], inSource = false) => {
              for (const item of items) {
                if (item.id === sourceId) {
                  movedItem = item;
                  if (item.id === targetId || item.id === operation.targetId)
                    isDescendant = true;
                  if (item.childItems) find(item.childItems, true);
                } else {
                  if (
                    inSource &&
                    (item.id === targetId || item.id === operation.targetId)
                  ) {
                    isDescendant = true;
                  }
                  if (item.childItems) find(item.childItems, inSource);
                }
              }
            };
            find(prev);

            if (!movedItem || isDescendant) return prev;

            return mutateTree(prev, movedItem, operation, sourceId);
          });
        }
      },
    });
  }, [itemTemplates, getDefaultItem]);

  function handleUpdateField(id: string, updates: Partial<FormField>) {
    const updateItem = (items: FormField[]): FormField[] => {
      return items.map((item) => {
        if (item.id === id) return { ...item, ...updates };
        if (item.childItems)
          return { ...item, childItems: updateItem(item.childItems) };
        return item;
      });
    };
    setFormFields(updateItem(formFields));
  }

  function handleDeleteField(id: string) {
    const removeItem = (items: FormField[]): FormField[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          childItems: item.childItems
            ? removeItem(item.childItems)
            : item.childItems,
        }));
    };
    setFormFields(removeItem(formFields));
    if (selectedFieldId === id) setSelectedFieldId(null);
    setIsModalOpen(false);
  }

  function handleSettingsClick(id: string) {
    setSelectedFieldId(id);
    setIsModalOpen(true);
  }

  return (
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
            formFields={formFields}
            onSettingsClick={handleSettingsClick}
          />

          {/* フィールド設定モーダル */}
          <FormSettingDialog
            open={isModalOpen}
            field={selectedField}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdateField}
            onDelete={handleDeleteField}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
