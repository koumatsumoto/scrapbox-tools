import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import { getOrientationAndMotionStream } from '../../libs/common/deviceorientation-and-devicemotion';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);
  const $ = getOrientationAndMotionStream();

  $.subscribe((data) => {
    debugBoard.updateText(JSON.stringify(data, null, 2));
  });
};
