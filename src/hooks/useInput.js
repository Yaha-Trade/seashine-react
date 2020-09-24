import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [hasErrors, setHasErrors] = useState(false);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
        setHasErrors(false);
      },
    },
    hasErrors,
    setHasErrors,
  };
};
