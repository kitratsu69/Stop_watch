import React, { useEffect, useState } from "react";
import { calculatetime, getfomtime } from "./func";

export let globalcounter = 0;

export function globalset(val: number) {
  globalcounter = val;
}

type setter = (n: number) => void;
export default function Counter(props: {
  state: boolean;
  // oninit: (settcounter: (v: number) => void) => void;
  oninit: (set1: setter) => void;
}) {
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    props.oninit(setcounter);
  }, []);

  function stopwatch() {
    if (props.state) {
      setcounter((v) => {
        globalcounter = v + 1;
        return v + 1;
      });
    }
  }

  useEffect(() => {
    const timeout = setInterval(stopwatch, 10);
    return () => {
      clearInterval(timeout);
    };
  }, [props.state]);
  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <span className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-200 justify-center">
          {getfomtime(calculatetime(counter))}
        </span>
        <div className="flex w-full max-w-[300px] justify-between text-left text-gray-200 ">
          <span className="">hr</span>
          <span className="">min</span>
          <span className="">sec</span>
          <span className="">m-sec</span>
        </div>
      </div>
    </div>
  );
}
