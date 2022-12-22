import { NotificationItem } from "./notificationItem";

export const NotificationList = ({ notifications }) => {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <li key={notification.id} className="py-4">
            <NotificationItem
              user={notification.user}
              entity={notification.entity}
              entityDetail={notification.detail}
              detailValue={notification.value}
              time={notification.time}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
