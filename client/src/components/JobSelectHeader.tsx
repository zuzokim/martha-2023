import SvgComponent from "./SvgComponent";
import HeaderRoundPng from "../../public/assets/svgs/header_round.png";
import { css } from "@emotion/react";

const headerContainerStyle = css`
  position: relative;
`;

const headerStyle = css`
  font-family: var(--martha-font-arita-dotum-medium);
  color: var(--martha-secondary-color);
  font-size: 15px;
  line-height: 1;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -100%);
  white-space: nowrap;
`;

export interface JobSelectHeaderProps {}
const JobSelectHeader = (props: JobSelectHeaderProps) => {
  const { ...others } = props;
  return (
    <div css={headerContainerStyle}>
      <div>
        <SvgComponent
          src={HeaderRoundPng}
          alt="JobSelectHeader"
          css={css`
            width: 252px;
            display: block;
          `}
          {...others}
        />
        <h1 css={headerStyle}>직업 선택</h1>
      </div>
    </div>
  );
};

export default JobSelectHeader;
