import SvgComponent from "./SvgComponent";
import NextSvg from "../../public/assets/svgs/next_button.svg";
import { css } from "@emotion/react";

export interface NextNavigationProps {

}
const NextNavigation = (props: NextNavigationProps) => {
  const { ...others } = props;
  return <SvgComponent src={NextSvg} alt="next" css={css``} {...others} />;
};

export default NextNavigation;
