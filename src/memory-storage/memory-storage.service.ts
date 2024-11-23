import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryStorageService {
  private storage: Record<string, any> = {};

  set(key: string, value: any): Record<string, any> {
    this.storage[key] = value;
    return value;
  }

  get(key: string): any {
    return this.storage[key];
  }

  delete(key: string): void {
    delete this.storage[key];
  }

  getAll(): Record<string, any> {
    return this.storage;
  }
}
