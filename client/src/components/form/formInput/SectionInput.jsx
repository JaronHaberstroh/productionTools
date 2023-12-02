export default function SectionInput(props) {
  const { id, label, name, sectionOptions } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={id || name}>
        {sectionOptions.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
