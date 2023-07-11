export interface IServiceReader<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>
}

export interface IServiceWriter<T, U> {
  update(id: string, arg: Omit<T, 'id'>): Promise<T>;
  create(arg: U): Promise<T>;
}

export interface IServiceDelete {
  removeById(id: string): Promise<void>;
}

export interface IService<T, U> extends
  IServiceReader<T>,
  IServiceWriter<T, U>,
  IServiceDelete {}
