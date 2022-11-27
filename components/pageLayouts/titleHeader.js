export const PageTitleHeader = ({ title }) => {
  return (
    <>
      <div className="pt-4 pb-2 border-b-2 border-gray-100">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      </div>
      <div className="pb-2"></div>
    </>
  );
};
