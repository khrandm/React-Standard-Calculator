export const entry = entry => {
  return {
    type: "ENTRY",
    payload: entry
  };
};

export const del = () => {
  return {
    type: "DELETE"
  };
};
export const clear = () => {
  return {
    type: "CLEAR"
  };
};

export const decimal = () => {
  return {
    type: "DECIMAL"
  };
};

export const operation = operation => {
  return {
    type: "OPERATION",
    payload: operation
  };
};

export const equals = () => {
  return {
    type: "EQUALS"
  };
};
