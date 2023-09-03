import { css } from "@emotion/react";
import Logo from "./Logo";

const mainContainerStyle = () => css`
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface MainProps {}

const Main = (props: MainProps) => {
  const { ...others } = props;

  return (
    <div css={mainContainerStyle} {...others}>
      <Logo />
    </div>
  );
};

export default Main;
