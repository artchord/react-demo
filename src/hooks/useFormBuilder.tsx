import React, { ReactNode } from "react";
import {
  TextFields as TextFieldsIcon,
  Notes as NotesIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  ArrowDropDownCircle as ArrowDropDownCircleIcon,
  Numbers as NumbersIcon,
  Email as EmailIcon,
  CalendarToday as CalendarTodayIcon,
  Layers as LayersIcon,
} from "@mui/icons-material";
import TextBox from "@components/molecules/TextBox";
import TextareaBox from "@components/molecules/TextareaBox";
import CheckBox from "@components/molecules/CheckBox";
import RadioBox from "@components/molecules/RadioBox";
import SelectBox from "@components/molecules/SelectBox";
import type { FormField } from "@type/formItem";

import type { FormItemType } from "@type/formItem";
import GroupBox from "@components/molecules/GroupBox";

export interface FormItemTemplate extends FormField {
  icon: ReactNode;
}

export default function useFormBuilder() {
  const defaultSettings = {
    label: "",
    placeholder: "",
    required: false,
    value: "",
  };

  const defaultItem: FormField = {
    id: "",
    type: "" as FormItemType,
    settings: {
      ...defaultSettings,
    },
    childItems: [],
  };

  const defaultChildItems: Record<string, FormField[]> = {
    radio: [
      {
        ...structuredClone(defaultItem),
        id: "radio-1",
        settings: {
          ...defaultSettings,
          label: "選択肢1",
          value: "1",
        },
        type: "radio",
      },
      {
        ...structuredClone(defaultItem),
        id: "radio-2",
        settings: {
          ...defaultSettings,
          label: "選択肢2",
          value: "2",
        },
        type: "radio",
      },
    ],
    select: [
      {
        ...structuredClone(defaultItem),
        id: "select-1",
        settings: {
          ...defaultSettings,
          label: "選択肢1",
          value: "1",
        },
        type: "select",
      },
      {
        ...structuredClone(defaultItem),
        id: "select-2",
        settings: {
          ...defaultSettings,
          label: "選択肢2",
          value: "2",
        },
        type: "select",
      },
    ],
    checkbox: [
      {
        ...structuredClone(defaultItem),
        id: "checkbox-1",
        settings: {
          ...defaultSettings,
          label: "選択肢1",
          value: "1",
        },
        type: "checkbox",
      },
      {
        ...structuredClone(defaultItem),
        id: "checkbox-2",
        settings: {
          ...defaultSettings,
          label: "選択肢2",
          value: "2",
        },
        type: "checkbox",
      },
    ],
  };

  function getDefaultChildItems(type: FormItemType): FormField[] {
    const items = defaultChildItems[type];
    return items ? structuredClone(items) : [];
  }

  function getDefaultItem(type: FormItemType, label: string) {
    return {
      ...structuredClone(defaultItem),
      id: type,
      settings: {
        ...defaultSettings,
        label,
      },
      type,
      childItems: getDefaultChildItems(type),
    };
  }

  const itemTemplates: Record<FormItemType, FormItemTemplate> = {
    text: { ...getDefaultItem("text", "テキスト"), icon: <TextFieldsIcon /> },
    textarea: {
      ...getDefaultItem("textarea", "テキストエリア"),
      icon: <NotesIcon />,
    },
    checkbox: {
      ...getDefaultItem("checkbox", "チェックボックス"),
      icon: <CheckBoxIcon />,
    },
    radio: {
      ...getDefaultItem("radio", "ラジオボタン"),
      icon: <RadioButtonCheckedIcon />,
    },
    select: {
      ...getDefaultItem("select", "ドロップダウン"),
      icon: <ArrowDropDownCircleIcon />,
    },
    number: { ...getDefaultItem("number", "数値"), icon: <NumbersIcon /> },
    email: { ...getDefaultItem("email", "メール"), icon: <EmailIcon /> },
    date: { ...getDefaultItem("date", "日付"), icon: <CalendarTodayIcon /> },
    group: { ...getDefaultItem("group", "グループ"), icon: <LayersIcon /> },
  };

  const formComponents: Record<FormItemType, JSX.Element> = {
    text: <TextBox />,
    textarea: <TextareaBox />,
    checkbox: <CheckBox />,
    radio: <RadioBox />,
    select: <SelectBox />,
    number: <TextBox type="number" />,
    email: <TextBox type="email" />,
    date: <TextBox type="date" />,
    group: <GroupBox />,
  };

  return {
    itemTemplates,
    formComponents,
    getDefaultItem,
  };
}
