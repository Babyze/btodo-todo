export type TimestampToDate<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};
