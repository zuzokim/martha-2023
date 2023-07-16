import SvgComponent from "./SvgComponent";
import LogoHeaderPng from "../../public/assets/svgs/logo_header.png";
import { css } from "@emotion/react";

export interface AboutHeaderProps {}
const AboutHeader = (props: AboutHeaderProps) => {
  const { ...others } = props;
  return (
    <SvgComponent
      src={LogoHeaderPng}
      alt="aboutHeader"
      css={css`
        width: 252px;
        display: block;
      `}
      {...others}
    />
  );
};

export default AboutHeader;
