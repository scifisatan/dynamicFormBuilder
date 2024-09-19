// types.ts
export interface FieldSchema {
  type: "text" | "email" | "date" | "tel" | "file" | "number";
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
}

export interface InputProps {
  type: string;
  name: string;
  label: string;
  value: string | File | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  accept?: string;
}

export interface FormProps {
  schema: FieldSchema[];
  onSubmit: (formData: Record<string, any>) => void;
}
