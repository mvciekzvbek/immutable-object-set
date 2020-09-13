export const setIn = (path, value, object) => {
  if (!Array.isArray(path) && !path.length) {
    return value;
  }
  let copy = Object.assign({}, object);
  const currentElement = path[0];
  if (path.length > 1) {
    const newArray = path.slice(1);
    const innerObject = copy.hasOwnProperty(currentElement) ? copy[currentElement] : {};
    value = setIn(newArray, value, innerObject)
  }
  copy[currentElement] = value;
  return copy;
};
