import SvgComponent from "./SvgComponent";
import PlayButtonSvg from "../../public/assets/svgs/play_button.svg";

export interface PlayButtonProps {
  onClick?: () => void;
}
const PlayButton = (props: PlayButtonProps) => {
  const { onClick, ...others } = props;
  return (
    <SvgComponent
      role="button"
      aria-label="playButton"
      src={PlayButtonSvg}
      alt="playButton"
      onClick={onClick}
      {...others}
    />
  );
};

export default PlayButton;
