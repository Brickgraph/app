// Button to filter a data array by a given property
//
// Props:
//   data: array of objects
//   property: string
//   value: string
//   children: string
//   className: string
//   onClick: function

import React from "react";

const FilterGraphButton = ({
  data,
  property,
  value,
  children,
  className,
  onClick,
}) => {
  const filteredData = data.filter((item) => item[property] === value);
  return (
    <button className={className} onClick={() => onClick(filteredData)}>
      {children}
    </button>
  );
};
