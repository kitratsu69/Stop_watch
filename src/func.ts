type Timer = {
  millisec: number;
  seconds: number;
  minutes: number;
  hours: number;
};

function formnum(num: number) {
  return new Intl.NumberFormat("en-IN", { minimumIntegerDigits: 2 }).format(
    num
  );
}

export function calculatetime(counter: number): Timer {
  let millisec = counter % 100;
  let seconds = Math.floor(counter / 100) % 60;
  let minutes = Math.floor(counter / 100 / 60) % 60;
  let hours = Math.floor(counter / 100 / 60 / 60) % 60;

  return { millisec, seconds, minutes, hours };
}

export function getfomtime(timer: Timer) {
  return `${formnum(timer.hours)}:${formnum(timer.minutes)}:${formnum(
    timer.seconds
  )}:${formnum(timer.millisec)}`;
}
