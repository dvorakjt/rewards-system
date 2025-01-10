import { injectable } from "inversify";
import { Spinner } from "cli-spinner";
import type { ILoadingIndicator } from "./i-loading-indicator";

@injectable()
export class LoadingIndicator implements ILoadingIndicator {
  private spinner: Spinner | null = null;

  startLoading(message: string): void {
    this.spinner = new Spinner(message + " %s");
    this.spinner.setSpinnerString("|/-\\");
    this.spinner.start();
  }

  stopLoading(): void {
    this.spinner?.stop(true);
  }
}
