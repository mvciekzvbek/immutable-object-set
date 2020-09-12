export const setIn = (path, value, object) => {
  if (!path.length) {
    return value;
  }
  let copy = Object.assign({}, object);
  const current = path[0];
  if (path.length > 1) {
    const newArray = path.slice(1);
    const innerObject = copy.hasOwnProperty(current) ? copy[current] : {};
    value = setIn(newArray, value, innerObject)
  }
  copy[current] = value;
  return copy;
};
