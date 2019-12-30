import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import { getDeviceMotionWithChangeStream } from '../../libs/common';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);
  const motionWithChange$ = getDeviceMotionWithChangeStream();

  motionWithChange$.subscribe((data) => {
    debugBoard.updateText(JSON.stringify(data, null, 2));
  });
};
