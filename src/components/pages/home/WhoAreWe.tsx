import React from "react";

import strings from "../../../assets/text/strings.json";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export const WhoAreWe = () => {
  return (
    <div className="w-1/2 py-4 self-center">
      <p className="text-center ">{strings.band_presentation_part1}</p>
      <br />
      <p className="text-center ">{strings.band_presentation_part2}</p>
      <br />
      <p className="text-center ">{strings.band_presentation_part3}</p>
      <br />
      <p className="text-center ">{strings.band_presentation_part4}</p>
      <br />
      <p className="text-center ">{strings.band_presentation_part5}</p>
      <br />
      <p className="text-center ">{strings.band_presentation_part6}</p>
    </div>
  );
};
