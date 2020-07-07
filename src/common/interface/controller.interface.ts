export interface BaseControllerOptions<T, D> {
  entity: { new (): T };
  dto: { new (): D };
}
