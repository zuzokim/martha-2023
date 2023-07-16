import { css } from "@emotion/react";
import Logo from "./Logo";
import PlayButton from "./PlayButton";
import AboutButton from "./AboutButton";
import { NavLink } from "react-router-dom";

const mainContainerStyle = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  gap: 43px;
`;

export interface MainProps {}

const Main = (props: MainProps) => {
  const { ...others } = props;

  return (
    <div css={mainContainerStyle} {...others}>
      {/* name the path explicitly here instead of using 'nextpath' store value */}
      <NavLink to={"/about"}>
        <AboutButton />
      </NavLink>
      <Logo />
      {/* name the path explicitly here instead of using 'nextpath' store value */}
      <NavLink to={"/playintro"}>
        <PlayButton />
      </NavLink>
    </div>
  );
};

export default Main;
