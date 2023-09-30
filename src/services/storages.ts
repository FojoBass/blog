export class StorageFuncs {
  static setStorage<T>(type: 'local' | 'session', key: string, value: T) {
    if (type === 'local') {
      localStorage.setItem(key, JSON.stringify(value));
    }

    if (type === 'session') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getStorage<T>(type: 'local' | 'session', key: string): T {
    const storeInfo =
      (type === 'local'
        ? localStorage.getItem(key)
        : type === 'session'
        ? sessionStorage.getItem(key)
        : '') ?? '';

    return JSON.parse(storeInfo) as T;
  }

  static checkStorage(type: 'local' | 'session', key: string): boolean {
    return Boolean(
      type === 'local'
        ? localStorage.getItem(key)
        : type === 'session'
        ? localStorage.getItem(key)
        : ''
    );
  }
}
