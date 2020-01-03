import { Observable } from 'rxjs';
import { getRx } from '../../rxjs';
import { DeviceOrientation, PartialDeviceOrientation } from '../types';
import { extract, onlyEntire } from './internal/rx-operators';

export const getDeviceOrientationEventStream = () => {
  const Subject = getRx().Subject;
  const subject = new Subject<PartialDeviceOrientation>();

  window.addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
    subject.next(e);
  });

  return subject.asObservable();
};

export const getDeviceOrientationStream = () => {
  return getDeviceOrientationEventStream().pipe(extract(), onlyEntire()) as Observable<DeviceOrientation>;
};
