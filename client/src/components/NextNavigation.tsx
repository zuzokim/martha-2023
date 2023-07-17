import SvgComponent from "./SvgComponent";
import ArrowRight from "../../public/assets/svgs/arrow_right.png";
import { css } from "@emotion/react";

export interface NextNavigationProps {
  onClick?: () => void;
}
const NextNavigation = (props: NextNavigationProps) => {
  const { onClick, ...others } = props;
  return (
    <SvgComponent
      src={ArrowRight}
      alt="next"
      css={css`
        height: 24px;
      `}
      onClick={() => {
        onClick?.();
      }}
      {...others}
    />
  );
};

export default NextNavigation;
