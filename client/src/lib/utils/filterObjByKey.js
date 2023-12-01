export default function filterObjByKeys(obj, excludedKeys) {
  const result = Object.keys(obj)
    .filter((key) => !excludedKeys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

  return result;
}
