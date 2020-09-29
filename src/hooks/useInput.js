import { useState } from "react";

export const useInput = (initialValue, onlyNumbers = false) => {
  const [value, setValue] = useState(initialValue);
  const [hasErrors, setHasErrors] = useState(false);
  const onlyNumbersExpression = /^[0-9\b]+$/;

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        const newValue = event.target.value;

        if (!onlyNumbers) {
          setValue(newValue);
        } else if (newValue === "" || onlyNumbersExpression.test(newValue)) {
          setValue(newValue);
        }

        setHasErrors(false);
      },
    },
    hasErrors,
    setHasErrors,
  };
};
