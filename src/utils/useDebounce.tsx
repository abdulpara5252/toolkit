import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useDebounce - Debounce a value
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 */
export function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback - Debounce a function
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced function
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const callbackRef = useRef(callback);
  
  // Update the ref if callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(callbackRef.current as any);
      const handler = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
      (callbackRef.current as any) = handler;
    },
    [delay]
  );
}
