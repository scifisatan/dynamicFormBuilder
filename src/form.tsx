import { useState } from "react";
import { Input } from "./input";
import { FieldSchema, FormProps } from "./types";

export const Form: React.FC<FormProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? (files ? files[0] : undefined) : value,
    });
  };

  const validateField = (field: FieldSchema, value: any): string | null => {
    switch (field.type) {
      case "email":
        if (field.required && !/\S+@\S+\.\S+/.test(value)) {
          return "Invalid email format";
        }
        break;
      case "number":
        if (field.required && isNaN(value)) {
          return "Value must be a number";
        }
        break;
      case "file":
        if (field.maxSize && value && value.size > field.maxSize) {
          return `File size must be less than ${field.maxSize / 1024 / 1024}MB`;
        }
        break;
      default:
        if (field.required && !value) {
          return `${field.label} is required`;
        }
        break;
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors: Record<string, string> = {};

    schema.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field, value);
      if (error) {
        validationErrors[field.name] = error;
        console.error(error);
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {schema.map((field) => (
        <div key={field.name}>
          <Input
            type={field.type}
            name={field.name}
            label={field.label}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            accept={field.accept}
          />
          {errors[field.name] && (
            <div className="error-message">{errors[field.name]}</div>
          )}
        </div>
      ))}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};
