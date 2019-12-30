import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import { getDeviceMotionWithChangeStream, toInt } from '../../libs/common';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);
  const motionWithChange$ = getDeviceMotionWithChangeStream({ scale: 100000 });

  motionWithChange$.subscribe((data) => {
    debugBoard.updateText(
      JSON.stringify(
        {
          acceleration: data.acceleration,
          rotationRate: {
            alpha: toInt(data.rotationRate.alpha / 100),
            beta: toInt(data.rotationRate.beta / 100),
            gamma: toInt(data.rotationRate.gamma / 100),
          },
        },
        null,
        2,
      ),
    );
  });
};
