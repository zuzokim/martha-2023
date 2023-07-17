import SvgComponent from "./SvgComponent";
import AboutButtonPng from "../../public/assets/svgs/intro_button.png";
import { css } from "@emotion/react";

export interface AboutButtonProps {
  onClick?: () => void;
}
const AboutButton = (props: AboutButtonProps) => {
  const { onClick, ...others } = props;
  return (
    <SvgComponent
      role="button"
      aria-label="introButton"
      src={AboutButtonPng}
      css={css`
        width: 50%;
        transform: translateX(50%);
        display: block;
      `}
      alt="introButton"
      onClick={onClick}
      {...others}
    />
  );
};

export default AboutButton;
