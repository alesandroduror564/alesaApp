export function tick() {
  return Promise.resolve();
}
export function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}
