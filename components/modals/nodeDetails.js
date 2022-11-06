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
    const { status, response } = await brickgraphRequest(token)
      .put(`test/node/update/${id}`, formData)
      .then((res) => {
        return { response: res.data, status: res.status };
      })
      .catch((err) => {
        return {
          response: err.response.data,
          status: err.response.status,
        };
      });
    switch (status) {
      case 201:
        console.log("Node updated");
        console.log(response);
        break;
      case 422:
        console.log("You do not have permission to update this node");
        break;
      default:
        console.log("Something went wrong: " + status);
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
