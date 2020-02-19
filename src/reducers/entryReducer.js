const initialState = {
  equation: "",
  entry: "0",
  operand: null,
  memory: null,
  decimalMode: false,
  entryMode: true,
  equalsMode: false,
  previousOperation: ""
};

const entryReducer = (state = initialState, { type, payload }) => {
  const {
    equation,
    entry,
    operand,
    memory,
    decimalMode,
    entryMode,
    equalsMode,
    previousOperation
  } = state;

  const calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case "+": {
        return firstOperand + secondOperand;
      }
      case "-": {
        return firstOperand - secondOperand;
      }
      case "÷": {
        return firstOperand / secondOperand;
      }
      case "x": {
        return firstOperand * secondOperand;
      }
      default: {
        return 0;
      }
    }
  };
  switch (type) {
    case "ENTRY": {
      if (entry.length < 18 || entryMode) {
        if ((entryMode || entry === "0") && !equalsMode) {
          return { ...state, entry: payload, entryMode: false };
        }
        if (equalsMode && entryMode) {
          return {
            ...state,
            entry: payload,
            equation: "",
            operand: null,
            entryMode: false
          };
        }
        return { ...state, entry: `${entry}${payload}`, entryMode: false };
      }
      return state;
    }
    case "DELETE": {
      if (entry.length < 2) {
        return { ...state, entry: "0" };
      } else if (!entryMode) {
        if (entry.slice(-1) === ".") {
          return { ...state, entry: entry.slice(0, -1), decimalMode: false };
        }
        return { ...state, entry: entry.slice(0, -1) };
      }
      return state;
    }
    case "CLEAR": {
      return initialState;
    }
    case "DECIMAL": {
      if (!decimalMode && !entryMode) {
        return { ...state, entry: `${entry}.`, entryMode: false, decimalMode: true };
      } else if (!decimalMode && entryMode) {
        return { ...state, entry: "0.", entryMode: false, decimalMode: true };
      }
      return state;
    }
    case "OPERATION": {
      const operation = operators => {
        switch (operators) {
          case "ADD": {
            return proceedOperation("+");
          }
          case "SUBTRACT": {
            return proceedOperation("-");
          }
          case "MULTIPLY": {
            return proceedOperation("x");
          }
          case "DIVIDE": {
            return proceedOperation("÷");
          }
          default: {
            return state;
          }
        }
      };
      const proceedOperation = operators => {
        if ((operand === null && !entryMode) || (entryMode && entry === "0") || equalsMode) {
          return {
            ...state,
            equation: `${entry}${operators}`,
            operand: parseFloat(entry),
            entryMode: true,
            equalsMode: false
          };
        } else if (!entryMode) {
          const calculatedValue = calculate(operand, parseFloat(entry), operators);
          return {
            ...state,
            equation: `${equation}${entry}${operators}`,
            entry: calculatedValue.toString(),
            operand: calculatedValue,
            entryMode: true
          };
        }
      };

      const operationController = operators => {
        if (!entryMode || (entry === "0" && entryMode && operand === null)) {
          if (previousOperation !== "" && previousOperation !== payload && !equalsMode) {
            return {
              ...operation(previousOperation),
              equation: `${equation}${entry}${operators}`,
              previousOperation: payload,
              decimalMode: false
            };
          } else {
            return {
              ...operation(payload),
              previousOperation: payload,
              decimalMode: false
            };
          }
        } else if (equalsMode) {
          return {
            ...operation(payload),
            previousOperation: payload,
            decimalMode: false,
            equalsMode: false
          };
        } else {
          return {
            ...state,
            equation: `${equation.slice(0, -1)}${operators}`,
            previousOperation: payload
          };
        }
      };

      switch (payload) {
        case "ADD": {
          return operationController("+");
        }
        case "SUBTRACT": {
          return operationController("-");
        }
        case "MULTIPLY": {
          return operationController("x");
        }
        case "DIVIDE": {
          return operationController("÷");
        }
        default: {
          return state;
        }
      }
    }
    case "EQUALS": {
      const equalOperation = operators => {
        if (memory === null || !equalsMode) {
          const calculatedValue = calculate(operand, parseFloat(entry), operators);
          return {
            ...state,
            memory: parseFloat(entry),
            operand: calculatedValue,
            equation: `${equation}${entry}=`,
            entry: calculatedValue.toString(),
            decimalMode: false,
            entryMode: true,
            equalsMode: true
          };
        } else {
          const calculatedValue = calculate(operand, memory, operators);
          return {
            ...state,
            operand: calculatedValue,
            equation: `${entry}${operators}${memory}=`,
            entry: calculatedValue.toString(),
            decimalMode: false,
            entryMode: true,
            equalsMode: true
          };
        }
      };
      switch (previousOperation) {
        case "ADD": {
          return equalOperation("+");
        }
        case "SUBTRACT": {
          return equalOperation("-");
        }
        case "MULTIPLY": {
          return equalOperation("x");
        }
        case "DIVIDE": {
          return equalOperation("÷");
        }

        default: {
          return {
            ...state,
            equation: `${entry}=`,
            entryMode: true
          };
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default entryReducer;
