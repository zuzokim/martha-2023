import SvgComponent from "./SvgComponent";
import PrevSvg from "../../public/assets/svgs/prev_button.svg";
import { css } from "@emotion/react";

export interface PrevNavigationProps {}
const PrevNavigation = (props: PrevNavigationProps) => {
  const { ...others } = props;
  return <SvgComponent src={PrevSvg} alt="prev" css={css``} {...others} />;
};

export default PrevNavigation;
