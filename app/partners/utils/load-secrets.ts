export function loadSecrets<T extends Record<string, string>>(
  environmentVariables: T
): Promise<{ [K in keyof T]: string }> {
  return Promise.resolve(environmentVariables);
}
