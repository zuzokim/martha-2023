import { css } from "@emotion/react";
import { usePathStore } from "./store";
import { NavLink, useLocation } from "react-router-dom";
import PrevNavigation from "./PrevNavigation";
import NextNavigation from "./NextNavigation";

const navigationContainerStyle = (path: string) => css`
  display: flex;
  gap: 24px;
  position: absolute;
  bottom: 20px;
  @media (min-width: 420px) {
    height: 96px;
  }
  left: 50%;
  transform: translateX(-50%);
  ${path === "/" &&
  css`
    display: none;
  `}
`;

export interface NavigationButtonsProps {}

const NavigationButtons = (props: NavigationButtonsProps) => {
  const { prevPath, path, nextPath } = usePathStore();

  const location = useLocation();

  return (
    <div css={() => navigationContainerStyle(location.pathname)}>
      {prevPath && (
        <NavLink to={prevPath}>
          <PrevNavigation />
        </NavLink>
      )}
      {nextPath && (
        <NavLink to={nextPath}>
          <NextNavigation />
        </NavLink>
      )}
    </div>
  );
};

export default NavigationButtons;
