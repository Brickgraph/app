export const DefaultInput = ({
  name,
  type,
  defaultValue,
  labelText,
  labelFor,
  isRequired,
  onChangeHandler,
  disable,
}) => {
  return (
    <>
      <div className="flex grid grid-rows-2 w-[100%]">
        <div className="inline-block align-middle">
          <label htmlFor={labelText}>{labelText}</label>
        </div>
        <div className="row-start-2">
          <input
            className="text-sm md:text-lg rounded-md border-2 border-gray-300 p-0 pl-2 w-[100%] border border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            name={name}
            type={type}
            labeltext={labelText}
            labelfor={labelFor}
            id={name}
            defaultValue={defaultValue}
            required={isRequired}
            onChange={onChangeHandler}
            disabled={disable}
          />
        </div>
      </div>
    </>
  );
};
