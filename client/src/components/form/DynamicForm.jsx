import { useEffect, useRef, useState, Fragment } from "react";
import { sendData } from "@/lib/api/userApi";
import styles from "@/components/form/form.module.css";
import TextInput from "@/components/form/formInput/TextInput";
import DateInput from "@/components/form/formInput/DateInput";
import RadioInput from "@/components/form/formInput/RadioInput";
import SectionInput from "./formInput/SectionInput";

export default function DynamicForm({ legendText, buttonText, formFields }) {
  const inputRef = useRef(null);

  const initialState = formFields.reduce((acc, field) => {
    acc[field.name] =
      field.type === "date"
        ? new Date().toISOString().split("T")[0]
        : field.type === "radio"
        ? "A"
        : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.centerContainer}>
      <form className={styles.formContainer}>
        <fieldset className={styles.formSection}>
          <legend>{legendText}</legend>
          {formFields.map((field, idx) => (
            <fieldset key={field.name}>
              {field.type === "text" && (
                <TextInput
                  name={field.name}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e, setFormData)}
                  ref={field.name === "fName" ? inputRef : null}
                />
              )}
              {field.type === "date" && (
                <DateInput
                  name={field.name}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              )}

              {field.type === "radio" && (
                <div key={field.name} className={styles.radioGroup}>
                  <RadioInput
                    inputName={field.name}
                    label={field.label}
                    radioOptions={field.options}
                    checked={formData[field.name]}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
              )}
              {field.type === "section" && (
                <SectionInput
                  inputName={field.name}
                  label={field.label}
                  sectionOptions={field.options}
                  checked={formData[field.name]}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              )}
            </fieldset>
          ))}
        </fieldset>
        <button
          className={styles.formButton}
          onClick={(e) =>
            handleClick(
              e,
              formData,
              setFormData,
              initialState,
              sendData,
              inputRef
            )
          }
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

function handleClick(
  e,
  formData,
  setFormData,
  initialState,
  sendData,
  inputRef
) {
  e.preventDefault();
  sendData("user/create", formData);
  setFormData(initialState);
  inputRef.current.focus();
}

function handleChange(e, setFormData) {
  const { name, value } = e.target;
  setFormData((prevValues) => ({ ...prevValues, [name]: value }));
}
