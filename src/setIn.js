export const setIn = (...args) => {
  if (args.length < 3) {
    throw new Error('Function needs to be called with 3 arguments');
  }

  let [path, value, object] = args;

  if (!Array.isArray(path)) {
    throw new Error('First argument should be an array');
  }

  if (Array.isArray(object)) {
    throw new Error('Third argument should not be an array');
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
