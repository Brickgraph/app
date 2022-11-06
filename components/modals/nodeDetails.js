import { useState, useEffect } from "react";
import ModalBase from "./modalBase";
import { CustomForm } from "../forms/layouts/customForm";
import { useSession } from "@clerk/nextjs";
import { brickgraphRequest } from "../../services/brickgraph-api";

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
  const { getToken } = useSession().session;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const formData = nodeDetails;
    const { id } = nodeDetails;
    console.log(token);
    try {
      const { status, data } = await brickgraphRequest(token).put(
        "/test/update_node?node_id=" + id,
        { node_properties: formData }
      );
      if (status === 200) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  const switchForm = () => {
    if (nodeDetails !== null) {
      const group = nodeDetails.group;
      switch (group) {
        case "Property": {
          let formKeys = ["label", "city", "access"];
          return formKeys;
        }
        case "Sector": {
          let formKeys = ["label", "access"];
          return formKeys;
        }
        case "Organisation": {
          let formKeys = ["name", "subscription", "access"];
          return formKeys;
        }
        default: {
          let formKeys = ["label", "access"];
          return formKeys;
        }
      }
    } else {
      let formKeys = ["label", "access"];
    }
  };

  useEffect(() => {
    switchForm(nodeDetails);
  }, [nodeDetails]);

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
          formKeys={switchForm(nodeDetails)}
          changeHandler={inputChangeHandler}
          cancelAction={onClose}
          submitAction={handleSubmit}
        />
      </ModalBase>
    </>
  );
};
