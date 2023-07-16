import SvgComponent from "./SvgComponent";
import PlayButtonPng from "../../public/assets/svgs/play_button.png";
import { css } from "@emotion/react";

export interface PlayButtonProps {
  onClick?: () => void;
}
const PlayButton = (props: PlayButtonProps) => {
  const { onClick, ...others } = props;
  return (
    <SvgComponent
      role="button"
      aria-label="playButton"
      src={PlayButtonPng}
      alt="playButton"
      css={css`
        width: 50%;
        transform: translateX(50%);
      `}
      onClick={onClick}
      {...others}
    />
  );
};

export default PlayButton;
