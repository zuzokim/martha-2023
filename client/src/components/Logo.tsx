import SvgComponent from "./SvgComponent";
import LogoPng from "../../public/assets/svgs/logo_vertical.png";
import { css } from "@emotion/react";

export interface LogoProps {}
const Logo = (props: LogoProps) => {
  const { ...others } = props;
  return (
    <SvgComponent
      src={LogoPng}
      alt="vertical_martha_logo"
      css={css`
        display: block;
        height: 92%;
        aspect-ratio: 1 / 4.65;
      `}
      {...others}
    />
  );
};

export default Logo;
