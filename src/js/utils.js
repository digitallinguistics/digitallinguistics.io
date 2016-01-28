const debounce = fn => {
  var delayed;
  return ev => {
    clearTimeout(delayed);
    delayed = setTimeout(() => { fn(ev); }, 250);
  };
};

const throttle = fn => {
  var allowSample = true;
  return ev => {
    if (allowSample) {
      allowSample = false;
      setTimeout(() => { allowSample = true; }, 250);
      fn(ev);
    }
  };
};
