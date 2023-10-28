import React from "react";
import PolymazeLogoWhite from "../../../assets/images/polymaze_logo.png";
import PolymazeCollage from "../../../assets/images/polymaze_collage.png";

export const BandHeader = () => {
  return (
    <div className="bg-red-100 flex flex-1 justify-center relative max-w-7xl mx-auto">
      <img className="w-full top-0" src={PolymazeCollage} />
      <img className="w-4/12  absolute bottom-1/4 " src={PolymazeLogoWhite} />
    </div>
  );
};
