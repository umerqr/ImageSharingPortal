export const sortAlphabetically = (incomingArrayOfObj, path = `value`) => {
  const getNested = (obj, path) =>
    path.split(`.`).reduce((a, prop) => a[prop], obj);
  return incomingArrayOfObj.sort((a, b) => {
    if (getNested(a, path) !== null && getNested(b, path) !== null) {
      const valueA = getNested(a, path).toUpperCase();
      const valueB = getNested(b, path).toUpperCase();
      if (valueA < valueB) {
        return -1;
      } else {
        return 1;
      }
    }
  });
};
