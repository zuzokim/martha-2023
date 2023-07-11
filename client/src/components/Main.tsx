import { css } from "@emotion/react";
//FIX: import identified svg correctly.
import { ReactComponent as PlayButton } from "../../public/assets/svgs/play_button.svg";
import { ReactComponent as Logo } from "../../public/assets/svgs/logo_martha.svg";
import { ReactComponent as IntroButton } from "../../public/assets/svgs/intro_button.svg";
import { useSwiper } from "swiper/react";

const mainContainerStyle = () => css`
  display: flex;
  flex-direction: column;
  gap: 43px;
  align-items: center;
`;

export type NavigationType = "PLAY" | "INTRO";

export interface MainProps {
  onClick: (navigationType: NavigationType) => void;
}
const Main = (props: MainProps) => {
  const { onClick } = props;

  const swiper = useSwiper();

  return (
    <div css={mainContainerStyle}>
      <PlayButton
        onClick={() => {
          onClick("PLAY");
          swiper.slideNext();
        }}
      />
      <Logo
        css={css`
          width: 99px; //99px33%
          aspect-ratio: 1 / 4.65;
        `}
      />
      <IntroButton
        onClick={() => {
          onClick("INTRO");
          swiper.slideNext();
        }}
      />
    </div>
  );
};

export default Main;
