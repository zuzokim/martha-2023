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
        /* width: 23vw; //99px */
        /* height: 100%; */
        height: 364px;
        aspect-ratio: 1 / 4.65;
        @media (min-width: 420px) {
          height: 464px;
        }
      `}
      {...others}
    />
  );
};

export default Logo;
