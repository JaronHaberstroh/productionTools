const DateInput = ({ id, name, label, value, onChange }) => {
  return (
    <>
      <label htmlFor={id || name}>{label}</label>
      <input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default DateInput;
