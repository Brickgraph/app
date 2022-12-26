import { useRef, useEffect, useState } from "react";

export const AddressLookupInput = ({
  detailId,
  inputId,
  initialValue,
  inputDisabled = false,
  onSubmitAction,
}) => {
  const [newValue, setNewValue] = useState(initialValue);

  //const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "GB" },
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  };

  const autoComplete = new google.maps.places.Autocomplete(
    inputRef.current,
    options
  );

  const retrieveAddressComponents = (place) => {
    const retrieveAddressComponent = (component) => {
      if (!place.address_components) {
        const body = [];
        return body;
      }
      const addressComponents = place.address_components;
      const addressComponentsLength = addressComponents.length;
      var componentName = [];
      // iterate through the address components to find the specified component
      for (let i = 0; i < addressComponentsLength; i++) {
        const addressComponent = addressComponents[i];

        if (addressComponent.types.includes(component)) {
          componentName[0] = addressComponent.long_name;
          break;
        } else {
          componentName[0] = "";
        }
      }
      return componentName[0];
    };
    const body = {
      address: place.name,
      address_postcode: retrieveAddressComponent("postal_code"),
      address_street_number: retrieveAddressComponent("street_number"),
      address_street: retrieveAddressComponent("route"),
      address_neighbourhood: retrieveAddressComponent("neighborhood"),
      address_city_town: retrieveAddressComponent("postal_town"),
      address_county: retrieveAddressComponent("administrative_area_level_2"),
      address_country: retrieveAddressComponent("country"),
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    return body;
  };

  /* useEffect(() => {
    if (place.address_components) {
      setAddressComponents(retrieveAddressComponents(place));
    }
  }, [place]); */

  /* const handlePlaceSelect = (place) => {
    setNewValue(place.name);
    const { body } = retrieveAddressComponents(place);
    onSubmitAction({ refId: detailId, body: body });
  }; */

  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  autoComplete.addListener("place_changed", () => {
    const placeSelected = autoComplete.getPlace();
    setNewValue(placeSelected.name);
    const components = retrieveAddressComponents(placeSelected);
    console.log(components);
    onSubmitAction({ refId: detailId, body: components });
  });

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
