export interface ILoadingIndicator {
  startLoading(message: string): void;
  stopLoading(message?: string): void;
}
