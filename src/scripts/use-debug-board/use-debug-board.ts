import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import { getOrientationAndMotionStream, OrientationAndMotion } from '../../libs/common/deviceorientation-and-devicemotion';
import { makeReadableTextContent } from './internal/make-readable-text-content';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);

  let orientationAndMotion: OrientationAndMotion | undefined;
  getOrientationAndMotionStream().subscribe((d) => (orientationAndMotion = d));

  const loop = () => {
    if (orientationAndMotion) {
      debugBoard.updateText(makeReadableTextContent(orientationAndMotion));
    }
    window.requestAnimationFrame(loop);
  };
  loop();
};
