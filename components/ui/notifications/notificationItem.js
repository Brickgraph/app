export const NotificationItem = ({
  user,
  entity,
  entityDetail,
  detailValue,
  time,
}) => {
  // calculate time difference between now and the time of the notification
  // if the difference is less than 1 minute, display "Just now"
  // if the difference is less than 1 hour, display "x minutes ago"
  // if the difference is less than 1 day, display "x hours ago"
  // if the difference is less than 1 week, display "x days ago"
  // if the difference is less than 1 month, display "x weeks ago"
  // if the difference is less than 1 year, display "x months ago"
  // if the difference is greater than 1 year, display "x years ago"
  // const time = "2d ago";
  return (
    <>
      <div className="flex space-x-3">
        <img className="h-6 w-6 rounded-full" src={user.imageUrl} alt="" />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{user.name}</h3>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
          <p className="text-sm text-gray-500">
            Updated details for {entity} - {entityDetail} to {detailValue}
          </p>
        </div>
      </div>
    </>
  );
};
