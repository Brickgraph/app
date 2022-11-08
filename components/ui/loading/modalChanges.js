import { LoadingSpinner } from "./loadingSpinner";

export const ModalChangesLoading = ({ show }) => {
  return (
    <>
      <div
        className="flex items-center justify-center h-full w-full bg-orange-700 bg-opacity-25 
                     backdrop-blur-md rounded-md"
      >
        <LoadingSpinner show={show} />
      </div>
    </>
  );
};
