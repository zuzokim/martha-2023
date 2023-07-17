import SvgComponent from "./SvgComponent";
import ArrowLeft from "../../public/assets/svgs/arrow_left.png";
import { css } from "@emotion/react";

export interface PrevNavigationProps {}
const PrevNavigation = (props: PrevNavigationProps) => {
  const { ...others } = props;
  return (
    <SvgComponent
      src={ArrowLeft}
      alt="prev"
      css={css`
        height: 24px;
      `}
      {...others}
    />
  );
};

export default PrevNavigation;
