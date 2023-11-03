const RadioOption = ({ id, name, value, checked, onChange, label }) => (
  <label key={id} id={id}>
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      checked={checked === value}
      onChange={onChange}
    />
    {label}
  </label>
);

const RadioInput = ({ inputName, label, onChange, radioOptions, checked }) => {
  return (
    <>
      <label key={inputName} id={inputName}>
        {label}
      </label>
      {radioOptions.map((option) => (
        <RadioOption
          key={`radio_${option}`}
          id={option}
          name={inputName}
          value={option}
          checked={checked}
          onChange={onChange}
          label={option}
        />
      ))}
    </>
  );
};

export default RadioInput;
