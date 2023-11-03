import { forwardRef } from "react";

const TextInput = forwardRef(
  ({ id, name, label, value, onChange, placeholder }, ref) => {
    return (
      <>
        <label htmlFor={id || name}>{label}</label>
        <input
          ref={ref}
          id={name}
          name={name}
          type="text"
          placeholder={placeholder || `Enter ${label}`}
          value={value}
          onChange={onChange}
        />
      </>
    );
  }
);

export default TextInput;
