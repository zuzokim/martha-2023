import { css } from "@emotion/react";
import { useJobSelectStore, usePathStore } from "./store";
import { NavLink, useLocation } from "react-router-dom";
import PrevNavigation from "./PrevNavigation";
import NextNavigation from "./NextNavigation";
import { connect } from "socket.io-client";

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
  ${(path === "/" || path === "/createmap" || path === "/playing") &&
  css`
    display: none;
  `}
`;

export interface NavigationButtonsProps {}

const NavigationButtons = (props: NavigationButtonsProps) => {
  const { prevPath, path, nextPath } = usePathStore();
  const { selectedJobInfo } = useJobSelectStore();

  const location = useLocation();

  const URL = `http://192.168.0.36:8000`;
  const socket = connect(URL);

  const handleClick = async () => {
    if (path === "/jobselect") {
      socket.emit("CreateMap", `${selectedJobInfo.jobType}`);

      try {
        const selectedJob = {
          jobId: selectedJobInfo.jobId,
          jobName: selectedJobInfo.jobName,
        };

        const response = await fetch(
          `http://127.0.0.1:5000/job_list:${selectedJob.jobId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedJob),
          }
        );
      } catch (error) {
        console.log(error);
        // throw new Error(error.message);
      }
    }
  };

  return (
    <div css={() => navigationContainerStyle(location.pathname)}>
      {prevPath && (
        <NavLink to={prevPath}>
          <PrevNavigation />
        </NavLink>
      )}
      {nextPath && (
        <NavLink to={nextPath}>
          <NextNavigation onClick={handleClick} />
        </NavLink>
      )}
    </div>
  );
};

export default NavigationButtons;
