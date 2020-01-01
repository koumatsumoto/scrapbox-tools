export type DoubleDimensionalArray<T> = T[][];
export type ValueOf<T> = T[keyof T];
export type Constructor<T> = { new (...args: unknown[]): T };
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
