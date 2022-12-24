import { useRef, useEffect, useState } from "react";

const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
function initMap() {}
const handlePlaceSelect = (place) => {
  console.log("Selected", place);
};

export const AddressLookupInput = ({
  detailId,
  inputId,
  initialValue,
  inputDisabled = false,
  onSubmitAction,
}) => {
  const [baseValue, setBaseValue] = useState(initialValue);
  const [newValue, setNewValue] = useState(baseValue);
  const [changeSubmitted, setChangeSubmitted] = useState(true);

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "GB" },
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  };
  useEffect(() => {
    autoCompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }, []);

  /* google.maps.event.addListener("place_changed", () =>
    handlePlaceSelect(autoCompleteRef.current.getPlace())
  ); */

  const handlePlaceSelect = (place) => {
    console.log("Selected", place);
  };

  const handleChange = (e) => {
    setNewValue(e.target.value);
    if (baseValue !== e.target.value) {
      setChangeSubmitted(false);
    }
    if (baseValue === e.target.value) {
      setChangeSubmitted(true);
    }
  };

  return (
    <div>
      <input
        id={inputId}
        disabled={inputDisabled}
        value={newValue ? newValue : ""}
        ref={inputRef}
        type="text"
        placeholder="Address Search"
        onChange={(e) => {
          handleChange(e);
        }}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full p-2"
      />
    </div>
  );
};
