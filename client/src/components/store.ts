import { create } from "zustand";
import {
  PREV_NAV_PATH,
  NEXT_NAV_PATH,
  NavigationType,
  JobInfo,
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
    set(({ jobList }) => {
      const selectedJobInfo = jobList?.find(
        (job) => job.jobName === (jobName ?? "우주 엘리베이터 안내원")
      );
      return {
        //set the jobList with queried jobList from server.
        selectedJobInfo,
      };
    });
  },
  jobList: [],
  setJobList: (jobList) => {
    set({ jobList });
  },
}));

export const useErrorStore = create<{
  hasError: boolean;
  fromError: boolean;
  setFromError: (transition: boolean) => void;
  setHasError: (hasError: boolean) => void;
}>((set) => ({
  hasError: false,
  fromError: false,
  setFromError: (fromError) => {
    set({ fromError });
  },
  setHasError: (hasError) => {
    set({ hasError });
  },
}));

export const useTriggerFoundStore = create<{
  triggerFound: boolean;
  setTriggerFound: (transition: boolean) => void;
}>((set) => ({
  triggerFound: false,
  setTriggerFound: (triggerFound) => {
    set({ triggerFound });
  },
}));
