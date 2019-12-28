import { getDeviceMotionStream } from '../../libs/common';
import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';

export const useDebugBoard = () => {
  const motion$ = getDeviceMotionStream();
  const debugBoard = componentManager.getInstance(MyDebugBoard);

  motion$.subscribe((e: DeviceMotionEvent) => {
    debugBoard.updateText(JSON.stringify(e));
  });
};
