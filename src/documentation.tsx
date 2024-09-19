import React from "react";
import "./documentation.css"; // Import the CSS file for styling

const Documentation: React.FC = () => {
  return (
    <div className="documentation-container">
      <h1>Form Schema Documentation</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This document provides details on the schema structure used to
          generate dynamic forms in the application. It describes the different
          types of inputs that can be specified and the validation rules applied
          to each type.
        </p>
      </section>

      <section>
        <h2>Schema Structure</h2>
        <p>
          The schema for generating the form is a JSON array where each object
          represents a field in the form. Each field object should have the
          following properties:
        </p>
        <ul>
          <li>
            <strong>
              <code>type</code>
            </strong>
            : Specifies the type of input field. Valid types are listed below.
          </li>
          <li>
            <strong>
              <code>name</code>
            </strong>
            : A unique identifier for the input field, used for form data
            handling.
          </li>
          <li>
            <strong>
              <code>label</code>
            </strong>
            : The text label displayed for the input field.
          </li>
          <li>
            <strong>
              <code>required</code>
            </strong>{" "}
            (optional): A boolean indicating whether the field is mandatory.
            Defaults to <code>false</code> if not provided.
          </li>
          <li>
            <strong>
              <code>accept</code>
            </strong>{" "}
            (optional): For file input types, specifies the allowed file types
            (e.g., <code>'image/*'</code> for images).
          </li>
          <li>
            <strong>
              <code>maxSize</code>
            </strong>{" "}
            (optional): For file input types, specifies the maximum file size in
            bytes.
          </li>
        </ul>
        <h3>Example Schema</h3>
        <pre>
          {`[
  {
    "type": "text",
    "name": "fullName",
    "label": "Full Name",
    "required": true
  },
  {
    "type": "email",
    "name": "email",
    "label": "Email",
    "required": true
  },
  {
    "type": "date",
    "name": "dateOfBirth",
    "label": "Date of Birth",
    "required": true
  },
  {
    "type": "tel",
    "name": "phone",
    "label": "Phone Number"
  },
  {
    "type": "file",
    "name": "profilePicture",
    "label": "Profile Picture",
    "accept": "image/*",
    "maxSize": 2097152  // 2 MB
  }
]`}
        </pre>
      </section>

      <section>
        <h2>Valid Input Types</h2>
        <h3>
          <code>text</code>
        </h3>
        <p>
          Standard text input field. Must have a <code>name</code> and{" "}
          <code>label</code>. Can be marked as <code>required</code>.
        </p>

        <h3>
          <code>email</code>
        </h3>
        <p>
          Input field for email addresses. Must have a <code>name</code> and{" "}
          <code>label</code>. Must follow email format (e.g.,{" "}
          <code>example@example.com</code>). Can be marked as{" "}
          <code>required</code>.
        </p>

        <h3>
          <code>number</code>
        </h3>
        <p>
          Input field for numeric values. Must have a <code>name</code> and{" "}
          <code>label</code>. Can be marked as <code>required</code>. Value must
          be a number.
        </p>

        <h3>
          <code>date</code>
        </h3>
        <p>
          Input field for selecting dates. Must have a <code>name</code> and{" "}
          <code>label</code>. Can be marked as <code>required</code>.
        </p>

        <h3>
          <code>tel</code>
        </h3>
        <p>
          Input field for telephone numbers. Must have a <code>name</code> and{" "}
          <code>label</code>. Can be marked as <code>required</code>. No
          specific format validation beyond input type.
        </p>

        <h3>
          <code>file</code>
        </h3>
        <p>
          Input field for file uploads. Must have a <code>name</code> and{" "}
          <code>label</code>. Can specify allowed file types using{" "}
          <code>accept</code> (e.g., <code>'image/*'</code> for images). Can
          specify maximum file size using <code>maxSize</code> in bytes.
        </p>
      </section>

      <section>
        <h2>Error Handling</h2>
        <p>
          - <strong>Invalid Type</strong>: If a field's <code>type</code> is not
          one of the allowed types, an error message will be displayed.
          <br />- <strong>Missing Required Fields</strong>: If a required field
          is empty, an error message will be shown.
          <br />- <strong>Invalid File Size</strong>: For file inputs, if the
          uploaded file exceeds the specified <code>maxSize</code>, an error
          message will be displayed.
        </p>
      </section>

      <section>
        <h2>Example Error Messages</h2>
        <pre>
          {`- "Invalid type 'number' for field 'phone'. Allowed types are: text, number, email, date, file, tel"
- "Email is required"
- "File size must be less than 2MB"`}
        </pre>
      </section>
    </div>
  );
};

export default Documentation;
