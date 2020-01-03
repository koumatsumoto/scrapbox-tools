import { MotionClassification } from './aggregate';
import { CommandTypes } from './to-command';

type State = {
  tipOnce: boolean;
  doubletipCheckCount: number;
  // prev to curr
  tipDirection: 'up' | 'down' | null;
};

const createState = (): State => ({
  tipOnce: false,
  doubletipCheckCount: 3,
  tipDirection: null,
});

export const makeTip = (values: MotionClassification[]): CommandTypes => {
  const state = createState();
  for (let i = 1; i < values.length; i++) {
    const current = values[i];
    const previous = values[i - 1];

    if (current.rate > 2 && previous.rate < 2) {
      const direction = current.direction;
      if (state.tipOnce && state.tipDirection === direction) {
        return 'double tip';
      }

      state.tipOnce = true;
      state.tipDirection = direction;
      continue;
    }

    if (state.tipOnce && --state.doubletipCheckCount < 0) {
      return 'tip';
    }
  }

  if (state.tipOnce) {
    return state.doubletipCheckCount > 0 ? 'tip expecting next' : 'tip';
  }

  return 'nothing';
};
