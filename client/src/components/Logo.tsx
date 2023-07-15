import SvgComponent from "./SvgComponent";
import LogoSvg from "../../public/assets/svgs/logo_martha.svg";
import { css } from "@emotion/react";

export interface LogoProps {}
const Logo = (props: LogoProps) => {
  const { ...others } = props;
  return (
    <SvgComponent
      src={LogoSvg}
      alt="martha_logo"
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
