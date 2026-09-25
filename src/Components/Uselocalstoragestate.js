import { useEffect, useState } from "react";

/**
 * Same shape as useState, but reads/writes a JSON value under `key`
 * in localStorage so it survives refreshes and closing the tab.
 */
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently, state still works in-memory
    }
  }, [key, value]);

  return [value, setValue];
}