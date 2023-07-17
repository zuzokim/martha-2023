import { create } from "zustand";
import {
  PREV_NAV_PATH,
  NEXT_NAV_PATH,
  NavigationType,
  jobList,
  JobType,
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
      nextPath: NEXT_NAV_PATH[pathKey as NavigationType],
    });
  },
}));

export type JobInfo = { jobId: number; jobName: string; jobType: JobType };

export interface JobSelectStoreState {
  selectedJobInfo: JobInfo;
  setSelectedJobInfo: (jobName: string) => void;
}

export const useJobSelectStore = create<JobSelectStoreState>((set) => ({
  selectedJobInfo: {} as unknown as JobInfo,
  setSelectedJobInfo: (jobName) => {
    // console.log(jobName);
    //TODO: set the jobList with queried jobList from server.
    const selectedJobInfo = jobList?.find((job) => job.jobName === jobName);
    set({
      selectedJobInfo,
    });
  },
}));
