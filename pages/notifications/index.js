import { PageTitleHeader } from "../../components/pageLayouts/titleHeader";
import { NotificationList } from "../../components/ui/notifications/notificationList";
import { UserSelect } from "../../components/ui/inputs/userSelect";
import { useEffect, useState } from "react";
import { EdgeDetailsModal } from "../../components/modals/edgeDetails";

const people = [
  {
    id: 1,
    name: "Lindsay W",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Alyssa R",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Anna B",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  // More people...
];
const activityItems = [
  {
    id: 1,
    user: people[0],
    entity: `King's Cross Station`,
    detail: "Area (acres)",
    value: "245",
    time: "2hr ago",
  },
  {
    id: 2,
    user: people[1],
    entity: `Industrial`,
    detail: "Description",
    value: "Properties zoned exclusively for industrial use",
    time: "1d ago",
  },
  {
    id: 3,
    user: people[2],
    entity: `Unit 1A`,
    detail: "NIA (sq ft)",
    value: "1500",
    time: "3d ago",
  },
  {
    id: 4,
    user: people[0],
    entity: `Paddington Station`,
    detail: "Purchase Date",
    value: "10-10-2020",
    time: "1m ago",
  },
  // More items...
];

export default function Notifications() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {}, [selectedUser]);

  const filteredActivityItems = selectedUser
    ? activityItems.filter((item) => {
        return item.user.id === selectedUser?.userId;
      })
    : activityItems;

  const clearSelectedUser = () => {
    return (
      <>
        <button onClick={() => setSelectedUser(null)}>x</button>
      </>
    );
  };

  return (
    <>
      <PageTitleHeader title="Notifications" />
      <div className="flex-grow">
        <button onClick={() => setModalShow(true)}>Show</button>
        <EdgeDetailsModal
          sourceNodeId={1}
          targetNodeId={25}
          onClose={() => setModalShow(false)}
          show={modalShow}
        />
        <UserSelect
          users={people}
          initialSelection={selectedUser}
          getSelectedUser={(e) => setSelectedUser(e)}
        />
      </div>
      <NotificationList notifications={filteredActivityItems} />
    </>
  );
}
