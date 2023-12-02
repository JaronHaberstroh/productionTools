export default function RadioInput(props) {
  const { name, label, onChange, radioOptions, checked } = props;

  return (
    <>
      <label key={name} id={name}>
        {label}
      </label>
      {radioOptions.map((option) => (
        <RadioOption
          key={`radio_${option}`}
          id={option}
          name={name}
          value={option}
          checked={checked}
          onChange={onChange}
          label={option}
        />
      ))}
    </>
  );
}

function RadioOption(props) {
  const { id, name, value, checked, onChange, label } = props;

  return (
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
}
