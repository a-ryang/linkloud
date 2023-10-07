export function saveToLocalStorage(key: string, value: unknown) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error("error saving to LocalStorage:", error);
  }
}

export function getFromLocalStorage<T>(key: string) {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return null;
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error("Error getting from LocalStorage:", error);
    return null;
  }
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
