import { componentManager } from '../component-manager';
import { MyDebugBoard } from '../../components';

export const useDebugBoard = () => {
  const debugBoard = componentManager.getInstance(MyDebugBoard);

  let data1: unknown;
  let data2: string[];
  let data3: unknown[];
  let data4: unknown;

  const loop = () => {
    if (data1) {
      debugBoard.setText(JSON.stringify(data1, null, 2), 'left-top');
    }
    if (data2) {
      debugBoard.setText(JSON.stringify(data2, null, 2), 'left-bot');
    }
    if (data3) {
      debugBoard.setText(JSON.stringify(data3, null, 2), 'right-top');
    }
    if (data4) {
      debugBoard.setText(JSON.stringify(data4, null, 2), 'right-bot');
    }

    window.requestAnimationFrame(loop);
  };
  loop();
};
