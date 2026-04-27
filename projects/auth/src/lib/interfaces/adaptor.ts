export interface Adaptor<T, U> {
  adapt(data: T): U;
}
