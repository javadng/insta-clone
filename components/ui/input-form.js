import { useState } from "react";

const InputForm = props => {
  const [inputValue, setInputValue] = useState("");

  if (!props.getInputValue) return;

  const onchangeHandler = e => {
    setInputValue(e.target.value);
  };

  const onBlurHandler = e => {
    props.getInputValue(inputValue);
  };

  return (
    <div className="my-2 form-row w-full">
      <input
        autoComplete="off"
        accept={props.accept}
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={onBlurHandler}
        onChange={onchangeHandler}
      />
    </div>
  );
};

export default InputForm;
