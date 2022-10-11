export default function TextInput({
  label,
  htmlFor,
  type,
  name,
  id,
  placeholder,
  helpText = null,
  helpTextId = null,
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          aria-describedby="email-description"
        />
      </div>
      (helpText ?
      <p className="mt-2 text-sm text-gray-500" id={helpTextId}>
        {helpText}
      </p>{" "}
      : <></>)
    </div>
  );
}
