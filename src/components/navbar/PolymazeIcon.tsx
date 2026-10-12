import Icon from "../../assets/images/polymaze_logo.png";

export interface PolymazeIconProps {
  onClickUrl: string;
}

const PolymazeIcon = ({ onClickUrl }: PolymazeIconProps) => (
  <a
    href={"#" + onClickUrl}
    className="rounded-md p-2 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
  >
    <img className="h-9 w-auto" src={Icon} alt="Polymaze" />
  </a>
);

export default PolymazeIcon;
