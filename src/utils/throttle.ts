//@ts-ignore
const throttle = (callback: (...args: any) => any, limit: number) => {
  var wait = false;
  return function (...args: [any]) {
    if (!wait) {
      //@ts-ignore
      callback.call(this, ...args);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
};

export default throttle;
