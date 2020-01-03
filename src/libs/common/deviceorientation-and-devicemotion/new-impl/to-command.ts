// TODO: not implemented
import { MotionClassification } from './aggregate';

export type CommandTypes =
  | 'tip'
  | 'double tip'
  | 'shake'
  | 'double shake'
  | 'nothing'
  | 'waiting'
  | 'tip expecting next'
  | 'shake expecting next';

export type Command = {
  action: CommandTypes;
  meta: {
    previous?: MotionClassification;
  };
};

type State = {
  // 0 -> 2
  startBySuddenAcceleration: boolean;
  // 0 -> 1
  startByGradualAcceleration: boolean;
  getSuddenAcceleration: number;
  getGradualAcceleration: number;
  continueSameAcceleration: number;
  graduallySlow: boolean;
  graduallyQuick: boolean;
  tipped: boolean;
  shaken: boolean;
  // used for double tip, shake
  remainCount: number;
};

const createState = (): State => ({
  startBySuddenAcceleration: false,
  startByGradualAcceleration: false,
  getSuddenAcceleration: 0,
  getGradualAcceleration: 0,
  continueSameAcceleration: 0,
  graduallySlow: false,
  graduallyQuick: false,
  tipped: false,
  shaken: false,
  // updated and used for double tip and shake action
  remainCount: 100,
});

const resetState = (state: State) => {
  state.startBySuddenAcceleration = false;
  state.startByGradualAcceleration = false;
  state.getSuddenAcceleration = 0;
  state.getGradualAcceleration = 0;
  state.continueSameAcceleration = 0;
  state.graduallySlow = false;
  state.graduallyQuick = false;
};

const handleTip = (state: State): Command | null => {
  if (state.startBySuddenAcceleration && !state.graduallySlow && !state.shaken) {
    if (state.tipped) {
      return {
        action: 'double tip',
        meta: {},
      };
    }

    state.tipped = true;
    state.remainCount = 4;
  }

  resetState(state);

  return null;
};

const handleShake = (state: State): Command | null => {
  if (state.startBySuddenAcceleration && !state.graduallySlow && !state.tipped) {
    if (state.shaken) {
      return {
        action: 'double shake',
        meta: {},
      };
    }

    state.shaken = true;
    state.remainCount = 4;
  }

  resetState(state);

  return null;
};

export const toCommandNotImplemented = (values: MotionClassification[]): Command => {
  const state = createState();

  for (let i = 1; --state.remainCount > 0 && i < values.length; i++) {
    const value = values[i];
    const previous = values[i - 1];

    // no motion, continue waiting
    if (previous.steady && value.steady) {
      resetState(state);

      continue;
    } else if (previous.steady && !value.steady) {
      state.startBySuddenAcceleration = value.rate > 2;
      state.startByGradualAcceleration = !state.startBySuddenAcceleration;

      continue;
    } else if (!previous.steady && value.steady) {
      switch (previous.rate) {
        // sudden acceleration
        case 4:
        case 3: {
          state.getSuddenAcceleration++;
          const doubletipOrNull = handleTip(state);
          if (doubletipOrNull) {
            return doubletipOrNull;
          }
          continue;
        }
        // gradual acceleration
        default: {
          state.getGradualAcceleration++;
          continue;
        }
      }
    } else {
      if (previous.direction === value.direction) {
        switch (previous.rate) {
          case 4: {
            if (value.rate === 4) {
              state.continueSameAcceleration++;
            } else if (value.rate === 3) {
              // TODO: work was stopped here
            }
            if (value.rate > 2) {
              state.continueSameAcceleration++;
            }
            continue;
          }
          case 3: {
            if (value.rate < 2) {
              // handle tip
              const doubletipOrNull = handleTip(state);
              if (doubletipOrNull) {
                return doubletipOrNull;
              }
            }
            continue;
          }
          case 2: {
            continue;
          }
          case 1: {
            continue;
          }
        }
      } else {
        if (previous.direction !== value.direction) {
          const doubleshakeOrNull = handleShake(state);
          if (doubleshakeOrNull) {
            return doubleshakeOrNull;
          } else {
            continue;
          }
        }
      }
    }

    // below
    // !previous.steady && !value.steady

    if (value.rate > 2) {
      // continue acceleration
    } else {
      state.graduallySlow = true;
    }

    /**
     * When prev is moving and current continue moving
     */

    /**
     * When current motion intensify or continue previous
     */
    continue;
  }

  if (state.remainCount > 0) {
    if (state.tipped) {
      return {
        action: 'tip expecting next',
        meta: {},
      };
    }
    if (state.shaken) {
      return {
        action: 'shake expecting next',
        meta: {},
      };
    }
  } else {
    if (state.tipped) {
      return {
        action: 'tip',
        meta: {},
      };
    }
    if (state.shaken) {
      return {
        action: 'shake',
        meta: {},
      };
    }
  }

  return {
    action: 'nothing',
    meta: {},
  };
};
