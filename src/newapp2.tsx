import React, { useEffect, useRef, useState } from "react";
import Counter, { globalcounter, globalset } from "./counter";
import { calculatetime, getfomtime } from "./func";

type valtype = {
  flag: number;
  time: number;
  total: number;
};

function Newapp2() {
  const [vals, setVals] = useState<valtype[]>([]);
  const [state, setState] = useState(false);
  const [fastlap, setFastlap] = useState(Number.MAX_VALUE);
  const [fastflag, setFastflag] = useState(0);
  const [slowlap, setSlowlap] = useState(Number.MIN_VALUE);
  const [slowflag, setSlowflag] = useState(0);
  const setcounter = useRef<(v: number) => void>();

  function fastestlap() {
    if (vals[vals.length - 1].time < fastlap) {
      setFastlap(vals[vals.length - 1].time);
      setFastflag(vals[vals.length - 1].flag);
    }
    if (vals[vals.length - 1].time > slowlap) {
      setSlowlap(vals[vals.length - 1].time);
      setSlowflag(vals[vals.length - 1].flag);
    }
    return { fastflag, slowflag };
  }

  return (
    <div className="flex flex-col mt-5 justify-center items-center w-full">
      <div className="space-y-5 flex flex-col justify-center items-center w-[94%]">
        <Counter
          oninit={(sc) => {
            setcounter.current = sc;
          }}
          state={state}
        />
        <div className="flex justify-between w-full max-w-[400px]">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              state == false ? setState(true) : setState(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-play"
              viewBox="0 0 16 16"
            >
              {state == false ? (
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
              ) : (
                <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
              )}
            </svg>
          </button>
          <button
            className={
              "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            }
            onClick={() => {
              setcounter.current!(0);
            }}
            onDoubleClick={() => {
              setVals([]);
              setFastlap(Number.MAX_VALUE);
              setSlowlap(Number.MIN_VALUE);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12. overflow-auto...284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              setVals([
                ...vals,
                {
                  flag: vals.length,
                  time: globalcounter - (vals[vals.length - 1]?.total ?? 0),
                  total: globalcounter,
                },
              ]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bookmark-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
            </svg>
          </button>
        </div>
        <div className="w-full max-w-[600px] flex items-center justify-center text-white text-xs sm:text-lg md:text-lg lg:text-lg bg- h-96  border-2 border-stone-400">
          <div className="flex w-[98%] h-[97%] border-2 border-stone-300 backdrop-blur opacity-70 bg-blend-hard-light bg-gradient-to-r from-slate-900 via-stone-600 to-neutral-900 overflow-auto justify-between">
            <div className="flex space-y-1 flex-col pl-2">
              <span className=" font-semibold text-xl">Laps</span>
              {vals.map((e, i) => {
                return (
                  <span className="flex flex-row">
                    <span>{e.flag}</span>
                    <span>
                      {fastestlap().fastflag == i
                        ? vals.length <= 1
                          ? ""
                          : "  :  " + "  fastest "
                        : ""}
                    </span>
                    <span>
                      {fastestlap().slowflag == i
                        ? vals.length <= 1
                          ? ""
                          : "  :  " + "  slowest"
                        : ""}
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="flex flex-col space-y-1">
              <span className=" font-semibold text-xl ">Time</span>
              {vals.map((e) => {
                return (
                  <span className="">{getfomtime(calculatetime(e.time))}</span>
                );
              })}
            </div>
            <div className="flex flex-col pr-2 space-y-1">
              <span className=" font-semibold text-xl">Total</span>
              {vals.map((e) => {
                return (
                  <span className="">{getfomtime(calculatetime(e.total))}</span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newapp2;
