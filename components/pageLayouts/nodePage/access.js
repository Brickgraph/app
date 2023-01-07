function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NodeAccess({ data, editRights }) {
  return (
    <>
      {editRights
        ? `You have edit rights for ${data.label}`
        : `You do not have edit rights for ${data.label}`}
    </>
  );
}
