import { ReactNode } from "react";
import {
  TextFields,
  Notes,
  CheckBox,
  RadioButtonChecked,
  ArrowDropDownCircle,
  Numbers,
  Email,
  CalendarToday,
} from "@mui/icons-material";
import { FormItemType } from "@type/formItem";

export interface FormItemTemplate {
  label: string;
  icon: ReactNode;
}

export default function useFormItem() {
  const FORM_ITEM_TEMPLATES: Record<FormItemType, FormItemTemplate> = {
    text: { label: "テキスト", icon: <TextFields /> },
    textarea: { label: "テキストエリア", icon: <Notes /> },
    checkbox: { label: "チェックボックス", icon: <CheckBox /> },
    radio: { label: "ラジオボタン", icon: <RadioButtonChecked /> },
    select: { label: "ドロップダウン", icon: <ArrowDropDownCircle /> },
    number: { label: "数値", icon: <Numbers /> },
    email: { label: "メール", icon: <Email /> },
    date: { label: "日付", icon: <CalendarToday /> },
  };

  return {
    itemTemplates: FORM_ITEM_TEMPLATES,
  };
}
