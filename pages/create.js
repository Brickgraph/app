import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { useSession } from "@clerk/nextjs";
import { brickgraphRequest } from "../services/brickgraph-api";
import { nodeSchema } from "../components/forms/config/nodeFieldsSchema";
import { PageTitleHeader } from "../components/pageLayouts/titleHeader";
import { FormBase } from "../components/forms/layouts/formBase";
import { useState } from "react";
import { LoadingNotification } from "../components/ui/notifications/loadingNotification";
import {
  CreateNodeSuccessful,
  CreateNodeFailed,
} from "../components/ui/notifications/createNode";
import { ComboBoxInput } from "../components/ui/inputs/comboBoxSelect";
import { CreateNodeDetails } from "../components/ui/details/createDetails";

export default function CreatePage({ label, comboBoxOptions }) {
  const [createLabel, setCreateLabel] = useState(label);
  const [formData, setFormData] = useState(null);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const [nodeCreated, setNodeCreated] = useState(null);
  const [nodeData, setNodeData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [sourceNode, setSourceNode] = useState(null);

  const session = useSession().session;
  const { getToken } = session;
  const labelDetails = nodeSchema.filter((node) => {
    return node.id === createLabel;
  });

  const formFields = labelDetails
    ? labelDetails[0].fields
    : nodeSchema[-1].fields;

  const inputChangeHandler = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const cancelAction = () => {
    document.getElementById("form").reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const body = {
      source_node_id: 21,
      target_node_label: nodeSchema.filter((i) => i.value === createLabel)[0]
        .id,
      relationship_type: `HAS_UNIT`,
      target_node_properties: formData,
      relationship_properties: {},
      access: "read-write",
    };
    setLoadingChanges(true);
    const { status, data } = await brickgraphRequest(token)
      .post(`nodes/create`, body)
      .then((res) => {
        return { data: res.data, status: res.status };
      })
      .catch((err) => {
        return {
          data: err.response.data,
          status: err.response.status,
        };
      });
    setLoadingChanges(false);
    if (status === 200) {
      console.log(status, data);
      setNodeData(data);
      setNodeCreated("success");
      setShowNotification(true);
      document.getElementById("form").reset();
    }
    if (status !== 200) {
      console.log(status, data);
      setNodeData(data);
      setNodeCreated("error");
      setShowNotification(true);
    }
  };

  return (
    <>
      <PageTitleHeader
        title={`Create New ${
          nodeSchema.filter((i) => i.value === createLabel)[0].label
        }`}
      />
      <div className="p-2 pb-6 border border-2 border-gray-100 shadow-xl">
        <div className="grid grid-cols-3 pb-6">
          <div className="col-span-1 text-lg font-medium text-gray-700 border border-2 border-gray-200 rounded-lg">
            <ComboBoxInput
              options={comboBoxOptions}
              handleSelections={setCreateLabel}
              currentSelections={createLabel}
              selectMultiple={false}
            />
          </div>
        </div>
        <div className="px-4">
          <CreateNodeDetails nodeLabel={createLabel} />
        </div>
      </div>
      {/*
      <div className="p-2 pb-6 border border-2 border-gray-100 shadow-xl">
        <FormBase
          fields={formFields}
          changeHandler={inputChangeHandler}
          cancelAction={cancelAction}
          submitAction={handleSubmit}
          formId={"form"}
        />
      </div> */}
      <LoadingNotification
        isVisible={loadingChanges}
        message={`Creating new ${label}`}
      />
      <CreateNodeSuccessful
        isVisible={nodeCreated === "success" && showNotification}
        node={nodeData}
        onClose={() => setShowNotification(false)}
      />
      <CreateNodeFailed
        isVisible={nodeCreated === "error" && showNotification}
        label={`${label}`}
        message={"Could not be created..."}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, query }) => {
    const { sessionId } = req.auth;
    const label = query?.label ? query.label : "";

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }
    const editableLabels = nodeSchema.filter((label) => {
      return label.editable === true;
    });

    // Check if label is editable, otherwise redirect to home
    const editable = editableLabels.some((item) => item.id === label);
    if (!editable) {
      return {
        redirect: { destination: "/" },
      };
    }

    const comboBoxOptions = editableLabels;

    return {
      props: { label, comboBoxOptions },
    };
  }
);
