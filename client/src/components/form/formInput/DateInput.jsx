export default function DateInput(props) {
  const { id, name, label, value, onChange } = props;

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
}
