import { onActivated, onDeactivated, onUnmounted } from 'vue';

type Callback = () => void;

export const usePolling = (callback: Callback, timeInterval = 60000) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const create = () => {
    timer = setInterval(() => {
      callback();
    }, timeInterval);
  };
  create();
  onUnmounted(() => {
    clearInterval(timer);
  });
  onActivated(() => {
    callback(); // 激活时执行一次
    if (!timer) create();
  });
  onDeactivated(() => {
    clearInterval(timer);
    timer = undefined;
  });
  return {
    timer,
  };
};
