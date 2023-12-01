export default function splitStringAndCapitalizeFirstWord(inputString) {
  return (
    inputString
      // Split on capital letters
      .split(/(?=[A-Z])/)
      // .map word capitalizing first letter and removing trailing s
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).replace(/s$/, "");
      })
      // rejoin words
      .join(" ")
  );
}
