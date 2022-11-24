import { useState, useEffect } from "react";
import ModalBase from "./modalBase";
import { CustomForm } from "../forms/layouts/customForm";
import { useSession } from "@clerk/nextjs";
import { brickgraphRequest } from "../../services/brickgraph-api";
import {
  UpdateNodeSuccessful,
  UpdateNodeFailed,
} from "../ui/notifications/updateNode";
import Link from "next/link";
import { LoadingNotification } from "../ui/notifications/loadingNotification";
import { switchNodeForm } from "../forms/config/handleNodeFormFields";
import { ExternalLinkIcon } from "@heroicons/react/outline";

export const NodeDetailsModal = ({ node, onClose, show }) => {
  const [nodeDetails, setNodeDetails] = useState(node);
  const [updatedNode, setUpdatedNode] = useState(null);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [errorMessage, setErrorMesage] = useState("");
  const [showUpdateFailedNotification, setShowUpdateFailedNotification] =
    useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);

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
    setLoadingChanges(true);
    const { status, data } = await brickgraphRequest(token)
      .put(`test/node/update/${id}`, formData)
      .then((res) => {
        return { data: res.data, status: res.status };
      })
      .catch((err) => {
        return {
          data: err.response.data,
          status: err.response.status,
        };
      });
    switch (status) {
      case 201:
        console.log(data);
        setUpdatedNode(data);
        setLoadingChanges(false);
        onClose();
        setShowUpdateNotification(true);
        break;
      case 422:
        setUpdatedNode(nodeDetails);
        setLoadingChanges(false);
        setErrorMesage("You do not have permission.");
        setShowUpdateFailedNotification(true);
        break;
      default:
        setUpdatedNode(nodeDetails);
        setLoadingChanges(false);
        setErrorMesage("Something went wrong.");
        setShowUpdateFailedNotification(true);
    }
  };

  const formFields = switchNodeForm(nodeDetails);

  useEffect(() => {
    switchNodeForm(nodeDetails);
  }, [nodeDetails]);

  return (
    <>
      <ModalBase show={show} onClose={onClose}>
        <div className="grid justify-items-center py-4">
          <button
            onClick={() => setLoadingChanges(true)}
            className="hover:bg-orange-200 p-2 rounded"
          >
            <Link href={node ? `/nodes/${node.id}` : ""}>
              <div className="flex items-center">
                <h1 className="text-lg md:text-xl text-black">
                  {node ? node.label : ""}
                </h1>
                <span className="w-2"> {"   "}</span>
                <ExternalLinkIcon className="h-5 w-5 text-gray-500" />
              </div>
            </Link>
          </button>
        </div>
        <CustomForm
          dictItem={nodeDetails}
          formFields={formFields}
          changeHandler={inputChangeHandler}
          cancelAction={onClose}
          submitAction={handleSubmit}
        />
      </ModalBase>
      <UpdateNodeSuccessful
        isVisible={showUpdateNotification}
        node={updatedNode}
        onClose={() => setShowUpdateNotification(false)}
      />
      <UpdateNodeFailed
        isVisible={showUpdateFailedNotification}
        node={updatedNode}
        onClose={() => setShowUpdateFailedNotification(false)}
        message={errorMessage}
      />
      <LoadingNotification isVisible={loadingChanges} message={"Loading..."} />
    </>
  );
};
