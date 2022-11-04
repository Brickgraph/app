import { useState, useEffect } from "react";
import ModalBase from "./modalBase";
import { DefaultInput } from "../forms/inputs/utils/Input";
import { FormBase } from "../forms/layouts/formBase";
import { CustomForm } from "../forms/layouts/customForm";

export const NodeDetailsModal = ({ node, onClose, show }) => {
  const [nodeDetails, setNodeDetails] = useState(node);

  useEffect(() => {
    setNodeDetails(node);
  }, [show]);

  function inputChangeHandler(event) {
    setNodeDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED", nodeDetails);
    onClose();
  };

  /* switch (nodeDetails.group) {
    case "Property":
        const formFields = ["label", "city", "access"];
    case "Sector":
        const formFields = ['label','access'] */

  return (
    <>
      <ModalBase show={show} onClose={onClose}>
        <div className="grid justify-items-center py-4">
          <h1 className="text-md md:text-lg text-black font-mono text-bold">
            {node ? node.group : ""}
          </h1>
          <h1 className="text-lg md:text-xl text-black text-bold">
            {node ? node.label : ""}
          </h1>
        </div>
        <CustomForm
          dictItem={nodeDetails}
          formKeys={["label", "city", "access"]}
          changeHandler={inputChangeHandler}
          cancelAction={onClose}
          submitAction={handleSubmit}
        />
      </ModalBase>
    </>
  );
};
