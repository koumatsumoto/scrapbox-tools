import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import { getDeviceMotionDataStream } from '../../libs/common/devicemotion/get-device-motion-stream';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);
  const motionWithChange$ = getDeviceMotionDataStream();

  motionWithChange$.subscribe((data) => {
    debugBoard.updateText(JSON.stringify(data, null, 2));
  });
};
