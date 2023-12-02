import { forwardRef } from "react";

export default forwardRef(function TextInput(props, ref) {
  const { id, name, label, value, onChange, placeholder } = props;
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
});
