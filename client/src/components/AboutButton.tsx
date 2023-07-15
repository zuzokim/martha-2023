import SvgComponent from "./SvgComponent";
import AboutButtonSvg from "../../public/assets/svgs/intro_button.svg";

export interface AboutButtonProps {
  onClick?: () => void;
}
const AboutButton = (props: AboutButtonProps) => {
  const { onClick, ...others } = props;
  return (
    <SvgComponent
      role="button"
      aria-label="introButton"
      src={AboutButtonSvg}
      alt="introButton"
      onClick={onClick}
      {...others}
    />
  );
};

export default AboutButton;
