export class StorageFuncs {
  static setStorage<T>(type: 'local' | 'session', key: string, value: T) {
    if (type === 'local') {
      localStorage.setItem(key, JSON.stringify(value));
    }

    if (type === 'session') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  // ! ERROR WHEN KEY IS NOT FOUND IN STORAGE. FIX!
  static getStorage<T>(type: 'local' | 'session', key: string): T | null {
    const storeInfo =
      (type === 'local'
        ? localStorage.getItem(key)
        : type === 'session'
        ? sessionStorage.getItem(key)
        : '') ?? null;

    return storeInfo ? (JSON.parse(storeInfo) as T) : null;
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
