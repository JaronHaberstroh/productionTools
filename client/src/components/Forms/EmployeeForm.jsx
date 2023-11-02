import { sendData } from "@/lib/api/userApi";
import { useEffect, useRef, useState } from "react";
import formFields from "@/lib/utils/formFields";
import styles from "./forms.module.css";

export default function EmployeeForm() {
  const inputRef = Array.from({ length: formFields.length }, () =>
    useRef(null)
  );

  useEffect(() => {
    inputRef[0].current.focus();
  }, []);

  const initialFormData = formFields.reduce((acc, field) => {
    acc[field.name] =
      field.type === "date"
        ? new Date().toISOString().split("T")[0]
        : field.type === "radio"
        ? "A"
        : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await sendData("user/create", formData);
    setFormData((prevValue) => ({
      ...prevValue,
      fName: "",
      lName: "",
      employeeNumber: "",
      currentPosition: "",
    }));
    inputRef[0].current.focus();
  };

  return (
    <form className={styles.parentContainer}>
      <fieldset className={styles.childContainer}>
        <legend>Employee Information</legend>

        {formFields.map((field, idx) => (
          <fieldset key={field.name}>
            <label>{field.placeholder}</label>
            {field.type === "radio" && (
              <div className={styles.radioContainer}>
                {field.options.map((option) => (
                  <label key={option}>
                    <input
                      type={field.type}
                      name={field.name}
                      value={option}
                      checked={formData[field.name] === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {field.type !== "radio" && (
              <input
                key={field.name}
                ref={inputRef[idx]}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                placeholder={"Enter " + field.placeholder.split(":")[0]}
                onChange={handleChange}
                className={styles.input}
              />
            )}
          </fieldset>
        ))}
      </fieldset>

      <button onClick={handleClick} className={styles.formButton}>
        Submit
      </button>
    </form>
  );
}
