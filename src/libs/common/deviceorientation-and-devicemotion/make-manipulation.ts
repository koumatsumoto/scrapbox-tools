import { Observable } from 'rxjs';
import { getRx } from '../rxjs';
import { OrientationAndMotionSummary } from './types';

type Intensity = 0 | 1 | 2 | 3;
type HorizontalManipulation = {
  direction: 'left' | 'right';
  directionChanged: boolean;
  /**
   * by orientation.gamma
   *
   * 0: value <= |10|
   * 1: |10| < value <= |20|
   * 2: |20| < value <= |40|
   * 3: |40| < value
   */
  intensity: Intensity;
  intensityChanged: boolean;
  intensityIncreased: boolean;
  intensityDecreased: boolean;
};

type Manipulation = {
  horizontal: HorizontalManipulation;
  // not implemented
  // vertical: {}
};

const getDirection = (gamma: number) => (gamma < 0 ? 'left' : 'right');
const getIntensity = (gamma: number): Intensity => {
  if (Math.abs(gamma) <= 10) {
    return 1;
  } else if (Math.abs(gamma) <= 20) {
    return 2;
  } else if (Math.abs(gamma) <= 40) {
    return 2;
  } else {
    return 3;
  }
};

const calculateHorizontalManipulation = ([prev, curr]: [
  OrientationAndMotionSummary,
  OrientationAndMotionSummary,
]): HorizontalManipulation => {
  const gamma = curr.orientation.gamma;
  const prevGamma = prev.orientation.gamma;

  const direction = getDirection(gamma);
  const directionChanged = direction !== getDirection(prevGamma);
  const intensity = getIntensity(gamma);
  const prevIntensity = getIntensity(prevGamma);
  const intensityChanged = intensity !== prevIntensity;
  const intensityIncreased = intensityChanged ? intensity > prevIntensity : false;
  const intensityDecreased = intensityChanged ? intensity < prevIntensity : false;

  return {
    direction,
    directionChanged,
    intensity,
    intensityChanged,
    intensityIncreased,
    intensityDecreased,
  };
};

const makeManipulation = (values: [OrientationAndMotionSummary, OrientationAndMotionSummary]): Manipulation => {
  return {
    horizontal: calculateHorizontalManipulation(values),
  };
};

export const toManipulation = () => (source: Observable<OrientationAndMotionSummary>) => {
  const { map, pairwise } = getRx().operators;

  return source.pipe(pairwise(), map(makeManipulation));
};
