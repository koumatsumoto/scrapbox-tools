import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import { getOrientationAndMotionDebugString, getOrientationAndMotionSummary } from '../../libs/common/deviceorientation-and-devicemotion';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);

  let data: any;
  let debugText = '';
  getOrientationAndMotionSummary().subscribe((d) => (data = d));
  getOrientationAndMotionDebugString().subscribe((d) => (debugText = d));

  const loop = () => {
    if (data && debugText) {
      const json = JSON.stringify(data, null, 2);
      debugBoard.updateText(`${json}\n${debugText}`);
    }
    window.requestAnimationFrame(loop);
  };
  loop();
};
