import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';
import {
  debug3,
  getCommandHistoryStream,
  debug4,
  getLastCommandStream,
} from '../../libs/common/deviceorientation-and-devicemotion/new-impl/get-motion-set-stream';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);

  let data1: unknown;
  let data2: string[];
  let data3: unknown[];
  let data4: unknown;
  getLastCommandStream().subscribe((d) => (data1 = d));
  getCommandHistoryStream().subscribe((d) => (data2 = d));
  debug3().subscribe((d) => (data3 = d));
  debug4().subscribe((d) => (data4 = d));

  const loop = () => {
    if (data1) {
      debugBoard.setText(JSON.stringify(data1, null, 2), 'left-top');
    }
    if (data2) {
      debugBoard.setText(JSON.stringify(data2, null, 2), 'left-bot');
    }
    if (data3) {
      debugBoard.setText(JSON.stringify(data3, null, 2), 'right-bot');
    }
    if (data4) {
      debugBoard.setText(JSON.stringify(data4, null, 2), 'right-top');
    }

    window.requestAnimationFrame(loop);
  };
  loop();
};
