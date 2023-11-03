const SectionInput = ({ id, label, inputName, sectionOptions }) => {
  return (
    <>
      <label htmlFor={inputName}>{label}</label>
      <select name={inputName} id={id || inputName}>
        {sectionOptions.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SectionInput;
