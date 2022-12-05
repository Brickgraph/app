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
import { getNodeDetails } from "../../services/nodes/getNodeID";
import { LoadingSpinner } from "../ui/loading/loadingSpinner";
import { Tabs } from "../ui/tabs/pageTabs";
import { useNodeStore } from "../../services/stores/nodeStore";

export const NodeDetailsModal = ({ nodeID, onClose, show }) => {
  const [nodeDetails, setNodeDetails] = useState(null);
  const [permissionDetails, setPermissionDetails] = useState(null);
  const [tabs, setTabs] = useState(null);
  const [tabSelected, setTabSelected] = useState(null);
  const [updatedNode, setUpdatedNode] = useState(null);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [errorMessage, setErrorMesage] = useState("");
  const [showUpdateFailedNotification, setShowUpdateFailedNotification] =
    useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const nodeStore = useNodeStore.getState();
  //.nodes.filter((n) => n.id === nodeID);
  console.log("Node Modal Store", nodeStore);

  const { session } = useSession();

  const nodeApiCall = async () => {
    const { getToken } = session;
    const token = await getToken();
    const { status, data, accessStatus, accessData } = await getNodeDetails(
      nodeID,
      token
    );
    if (status === 200) {
      tabs = data.group.split(", ");
      setNodeDetails(data);
      setTabs(tabs);
      setTabSelected(tabs[0]);
    }
    if (accessStatus === 200) {
      setPermissionDetails(accessData);
    }
    return { status, data };
  };

  useEffect(() => {
    if (show) {
      nodeApiCall();
    } else {
      setNodeDetails(null);
      setTabs(null);
      setTabSelected(null);
    }
  }, [show]);

  function inputChangeHandler(event) {
    setNodeDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  const updateNodeStore = (node) => {
    //useNodeStore.getState().updateNode(node);
    useNodeStore.setState().updateNode(node);
    console.log(
      "Node Store",
      useNodeStore.getState().nodes.filter((n) => n.id === nodeID)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { getToken } = session;
    const token = await getToken();
    const formData = nodeDetails;
    const { id } = nodeDetails;
    setLoadingChanges(true);
    const { status, data } = await brickgraphRequest(token)
      .put(`nodes/${id}/update/`, formData)
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
        setUpdatedNode(data);
        // Update node data in the node store
        updateNodeStore(data);
        setLoadingChanges(false);
        onClose();
        setShowUpdateNotification(true);
        setNodeDetails(null);
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

  const formFields = switchNodeForm(tabSelected);

  useEffect(() => {
    switchNodeForm(tabSelected);
  }, [tabSelected]);

  return (
    <>
      <ModalBase show={show} onClose={onClose}>
        <div className="grid justify-items-center py-4">
          <button
            onClick={() => setLoadingChanges(true)}
            className="hover:bg-orange-200 px-4 py-2 rounded"
          >
            <Link href={nodeID ? `/nodes/${nodeID}` : ""}>
              <div className="flex items-center">
                <h1 className="text-lg md:text-xl text-black">
                  {nodeDetails ? (
                    nodeDetails.label
                  ) : (
                    <LoadingSpinner message={"Loading..."} />
                  )}
                </h1>
                <span className="w-2"> {"   "}</span>
                <ExternalLinkIcon className="h-5 w-5 text-gray-500" />
              </div>
            </Link>
          </button>
        </div>
        <Tabs tabs={tabs} onSelect={setTabSelected}>
          <CustomForm
            dictItem={nodeDetails}
            formFields={formFields}
            changeHandler={inputChangeHandler}
            cancelAction={onClose}
            submitAction={handleSubmit}
          />
        </Tabs>
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
