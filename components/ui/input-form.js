const InputForm = props => {
  if (!props.getInputValue) return;

  const onchangeHandler = e => {
    props.getInputValue(e.target.value);
  };

  return (
    <div className="my-2 form-row w-full">
      <input
        autoComplete="off"
        accept={props.accept}
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={onchangeHandler}
      />
    </div>
  );
};

export default InputForm;
