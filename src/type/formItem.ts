export type FormItemType =
  | "text"
  | "textarea"
  | "checkbox"
  | "radio"
  | "select"
  | "number"
  | "email"
  | "date"
  | "group";

export interface FormSettings {
  label: string;
  required: boolean;
  placeholder: string;
  value?: string;
}

export interface FormField {
  id: string;
  type: FormItemType;
  settings: FormSettings;
  childItems?: FormField[];
}
