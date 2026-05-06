export type FormItemType =
  | "text"
  | "textarea"
  | "checkbox"
  | "radio"
  | "select"
  | "number"
  | "email"
  | "date";

export interface FormField {
  id: string;
  type: FormItemType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormBuilderItem {
  id: string;
  type: FormItemType;
}
