import React, { useState } from "react";

function Newapp() {
  const [dat, setDat] = useState(new Date());
  function refresh() {
    setDat(new Date());
  }
  const timeint = setInterval(refresh, 100);
  return (
    <div>
      <span className="m-32 font-extrabold text-3xl justify-center">
        {dat.toLocaleTimeString()}+{Math.floor(dat.getMilliseconds() / 10)}
      </span>
    </div>
  );
}

export default Newapp;
