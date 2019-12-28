import { getRx } from '../rxjs';

// Use singleton for performance
let subject: any;
export const getDeviceMotionStream = () => {
  if (subject) {
    return subject.asObservable();
  }

  const Subject = getRx().Subject;
  subject = new Subject<DeviceMotionEvent>();

  window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
    subject!.next(e);
  });

  return subject.asObservable();
};
