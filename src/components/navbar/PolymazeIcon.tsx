import { useNavigate } from "react-router-dom";
import Icon from "../../assets/images/polymaze_logo.png";

export interface PolymazeIconProps {
  onClickUrl: string;
}

const PolymazeIcon = ({ onClickUrl }: PolymazeIconProps) => {
  const navigate = useNavigate();
  return (
    <img
      className="h-8 w-auto transition-colors hover:bg-white/10 rounded-md p-2"
      src={Icon}
      onClick={() => navigate(onClickUrl)}
      alt="Your Company"
    />
  );
};

export default PolymazeIcon;
