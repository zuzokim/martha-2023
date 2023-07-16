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

export interface PlayIntroHeaderProps {}
const PlayIntroHeader = (props: PlayIntroHeaderProps) => {
  return (
    <div css={headerContainerStyle}>
      <div>
        <SvgComponent
          src={HeaderRoundPng}
          alt="PlayIntroHeader"
          css={css`
            width: 252px;
            display: block;
            /* width: 50%; */
            /* transform: translateX(50%); */
          `}
        />
        <h1 css={headerStyle}>플레이 안내</h1>
      </div>
    </div>
  );
};

export default PlayIntroHeader;
