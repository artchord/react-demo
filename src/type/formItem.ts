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

export interface FormField {
  id: string;
  type: FormItemType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  children?: FormField[];
}

export interface FormBuilderItem {
  id: string;
  type: FormItemType;
}
