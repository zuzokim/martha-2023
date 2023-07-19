import { create } from "zustand";
import {
  PREV_NAV_PATH,
  NEXT_NAV_PATH,
  NavigationType,
  JobInfo,
} from "./constants";

export interface PathStoreState {
  prevPath: string | null;
  nextPath: string | null;
  setPrevPath: (prevPath: string | null) => void;
  setNextPath: (nextPath: string | null) => void;
  path: string;
  setPath: (path: string) => void;
}

export const usePathStore = create<PathStoreState>((set) => ({
  prevPath: null,
  nextPath: "about",
  path: "/",
  setPrevPath: (prevPath) => set({ prevPath }),
  setNextPath: (nextPath) => set({ nextPath }),
  setPath: (path) => {
    // / => main
    const pathname = path;
    const modifiedPathname = pathname.slice(1);

    const pathKey = modifiedPathname.length === 0 ? "main" : modifiedPathname; // Remove the leading slash

    // console.log(pathname, "store pathname"); // Output: "pathname"
    set({
      prevPath: PREV_NAV_PATH[pathKey as NavigationType],
      path: pathname,
      nextPath: NEXT_NAV_PATH[pathKey as NavigationType],
    });
  },
}));

export interface JobSelectStoreState {
  selectedJobInfo: JobInfo;
  setSelectedJobInfo: (jobName: string) => void;
  jobList: JobInfo[];
  setJobList: (jobList: JobInfo[]) => void;
}

export const useJobSelectStore = create<JobSelectStoreState>((set) => ({
  selectedJobInfo: {
    jobId: 14,
    jobName: "우주 엘리베이터 안내원",
    jobType: "COSMIC",
  },
  setSelectedJobInfo: (jobName) => {
    set(({ jobList }) => ({
      //set the jobList with queried jobList from server.
      selectedJobInfo: jobList?.find(
        (job) => job.jobName === (jobName ?? "우주 엘리베이터 안내원")
      ),
    }));
  },
  jobList: [],
  setJobList: (jobList) => {
    set({ jobList });
  },
}));
