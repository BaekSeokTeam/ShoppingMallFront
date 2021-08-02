import React from "react";
import DaumPostcode from "react-daum-postcode";

export default function DaumAddress(props) {
  const handleComplete = async (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.onRevise(fullAddress);
    props.onShow();
  };

  return <DaumPostcode onComplete={handleComplete} />;
}
