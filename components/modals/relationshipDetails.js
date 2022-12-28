import { useState, useEffect } from "react";
import ModalBase from "./modalBase";

export const RelationshipDetailsModal = ({ relationshipId, onClose, show }) => {
  return (
    <ModalBase onClose={onClose} show={show}>
      <div>Relationship Details {relationshipId}</div>
      <button onClick={onClose}>Close</button>
    </ModalBase>
  );
};
