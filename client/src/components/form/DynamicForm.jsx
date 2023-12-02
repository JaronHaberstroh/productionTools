import { useEffect, useRef, useState } from "react";
import { sendData } from "@/lib/api/userApi";
import styles from "@/components/form/form.module.css";
import TextInput from "@/components/form/formInput/TextInput";
import DateInput from "@/components/form/formInput/DateInput";
import RadioInput from "@/components/form/formInput/RadioInput";
import SectionInput from "./formInput/SectionInput";

export default function DynamicForm(props) {
  const { legendText, buttonText, formFields } = props;
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

  const data = { formFields, formData, setFormData, inputRef };

  return (
    <div className={styles.centerContainer}>
      <form className={styles.formContainer}>
        <fieldset className={styles.formSection}>
          <legend>{legendText}</legend>
          {generateInputs(data)}
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

function generateInputs(data) {
  const { formFields, formData, setFormData, inputRef } = data;

  return formFields.map((field) => {
    const { type, name, label, options } = field;

    const inputProps = {
      name,
      label,
      value: formData[name],
      onChange: (e) => handleChange(e, setFormData),
    };

    if (type === "text") {
      inputProps.ref = name === "fName" ? inputRef : null;
    }

    if (type === "radio" || type === "section") {
      inputProps.checked = formData[name];
      inputProps["radio" ? "radioOptions" : "sectionOptions"] = options;
    }

    return (
      <fieldset key={field.name}>
        {type === "text" && <TextInput {...inputProps} />}
        {type === "date" && <DateInput {...inputProps} />}
        {type === "section" && <SectionInput {...inputProps} />}
        {type === "radio" && (
          <div key={name} className={styles.radioGroup}>
            <RadioInput {...inputProps} />
          </div>
        )}
      </fieldset>
    );
  });
}
