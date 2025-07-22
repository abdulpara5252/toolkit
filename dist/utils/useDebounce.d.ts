/**
 * useDebounce - Debounce a value
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 */
export declare function useDebounceValue<T>(value: T, delay: number): T;
/**
 * useDebouncedCallback - Debounce a function
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced function
 */
export declare function useDebouncedCallback<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void;
