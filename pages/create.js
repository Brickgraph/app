import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { PageTitleHeader } from "../components/pageLayouts/titleHeader";
import { FormBase } from "../components/forms/layouts/formBase";
import { propertyFields } from "../components/forms/config/nodeFields";
import { useState } from "react";
import { LoadingNotification } from "../components/ui/notifications/loadingNotification";
import { useSession } from "@clerk/nextjs";
import { brickgraphRequest } from "../services/brickgraph-api";

export default function CreatePage({ label }) {
  const [formData, setFormData] = useState(null);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const session = useSession().session;
  const { getToken } = session;

  function inputChangeHandler(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
    console.log(formData);
  }

  const cancelAction = () => {
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const body = {
      source_node_id: "1",
      target_node_label: `${label}`,
      target_node_properties: formData,
      relationship_type: `HAS_${label.toUpperCase()}`,
      relationship_properties: {},
    };
    setLoadingChanges(true);
    console.log(body);
    const { status, data } = await brickgraphRequest(token)
      .post(`nodes/create/`, body)
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
      console.log(status);
      console.log(data);
    }
    if (status !== 200) {
      console.log(status);
      console.log(data);
    }
  };

  return (
    <>
      <PageTitleHeader title={`New ${label}`} />
      <div className="p-2 pb-6 border border-2 border-gray-100 shadow-xl">
        <FormBase
          fields={propertyFields}
          changeHandler={inputChangeHandler}
          cancelAction={cancelAction}
          submitAction={handleSubmit}
        />
      </div>
      <LoadingNotification
        isVisible={loadingChanges}
        message={`Creating new ${label}`}
      />
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, query }) => {
    const { sessionId } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    const label = query?.label ? query.label : "";

    return {
      props: { label },
    };
  }
);
