// Create a new versio of a type and mark one or more properties as optional
// Source: https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-614417742
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
