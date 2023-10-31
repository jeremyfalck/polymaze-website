import strings from "../../../assets/text/strings.json";

const whiteTextClass = "text-center text-white";

export const WhoAreWe = () => {
  return (
    <div className="w-1/2 py-6 mx-auto self-center max-w-7xl">
      <p className={whiteTextClass}>{strings.band_presentation_part1}</p>
      <br />
      <p className={whiteTextClass}>{strings.band_presentation_part2}</p>
      <br />
      <p className={whiteTextClass}>{strings.band_presentation_part3}</p>
    </div>
  );
};
