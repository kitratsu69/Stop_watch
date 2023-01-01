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
      <div className="justify-center">
        <span className="text-8xl text-gray-200 justify-center">
          {getfomtime(calculatetime(counter))}
        </span>
        <div className="flex justify-center text-center text-gray-200 mr-[120px]">
          <span className="justify-center">hr</span>
          <span className="justify-center px-[110px]">min</span>
          <span className="justify-center">sec</span>
        </div>
      </div>
    </div>
  );
}
