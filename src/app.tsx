import React, { useState } from "react";
import "./app.css";
import { Form } from "./form"; 
import { FieldSchema } from "./types";
import Documentation from "./documentation";

const schemaData: FieldSchema[] = [
  {
    "type": "text",
    "name": "fullName",
    "label": "Full Name",
    "required": true
  },
  { "type": "email", "name": "email", "label": "Email", "required": true },
  {
    "type": "date",
    "name": "dateOfBirth",
    "label": "Date of Birth",
    "required": true
  },
  { "type": "tel", "name": "phone", "label": "Phone Number" },
  { "type": "text", "name": "occupation", "label": "Occupation" },
  {
    "type": "file",
    "name": "profilePicture",
    "label": "Profile Picture",
    "required": true,
    "accept": "image/*",
    "maxSize": 2097152
  },
  { "type": "number", "name": "age", "label": "Age", "required": true }
]



const App: React.FC = () => {
  const [schema, setSchema] = useState<FieldSchema[]>(schemaData);
  const [schemaInput, setSchemaInput] = useState<string>(""); // State for schema input
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const allowedTypes = ["text", "number", "email", "date", "file", "tel"];

  // Handle schema input changes
  const handleSchemaInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSchemaInput(e.target.value);
  };

  // Validate the schema
  const validateSchema = (schema: any): string | null => {
    if (!Array.isArray(schema)) {
      return "Schema must be an array";
    }

    for (const field of schema) {
      if (!field.type || !field.name || !field.label) {
        return "Each schema field must have a type, name, and label";
      }

      if (!allowedTypes.includes(field.type)) {
        return `Invalid type "${field.type}" for field "${field.name}". Allowed types are: ${allowedTypes.join(", ")}`;
      }
    }

    return null;
  };

  // Handle form generation
  const handleGenerateForm = () => {
    try {
      const parsedSchema = JSON.parse(schemaInput);

      // Validate the parsed schema
      const error = validateSchema(parsedSchema);
      if (error) {
        setSchemaError(error);
        setShowForm(false);
      } else {
        setSchema(parsedSchema);
        setSchemaError(null);
        setShowForm(true);
      }
    } catch (e: any) {
      setSchemaError(e.message);
      setShowForm(false);
    }
  };

  // Handle form submission
  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Form submitted:", formData);
    setSubmittedData(formData);
  };

  return (
    <div className="app-container">
      {!showForm && (
        <>
          <h1>Dynamic Form Builder</h1>

          <div className="schema-input-container">
            <h2>Input Schema (JSON)</h2>
            <textarea
              value={schemaInput}
              onChange={handleSchemaInputChange}
              placeholder="Paste your JSON schema here..."
              className="schema-textarea"
            />
            <button onClick={handleGenerateForm} className="submit-button">
              Generate Form
            </button>
          </div>
          <Documentation />
        </>
      )}
      {schemaError && <div className="error-message">{schemaError}</div>}

      {showForm && !schemaError && (
        <>
          <Form schema={schema} onSubmit={handleSubmit} />
          {submittedData && (
            <div className="submitted-data">
              <h2>Submitted Data:</h2>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
