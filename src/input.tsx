import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  required,
  accept,
}) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        name={name}
        value={type !== "file" ? (value as string) : undefined}
        onChange={onChange}
        required={required}
        accept={accept}
        className="input-field"
      />
    </div>
  );
};
