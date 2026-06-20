export interface ICounterValue {
  key: string;
  value: number;
}
export interface ICounter {
  job_counter: ICounterValue;
  teacher_counter: ICounterValue;
}
