import { injectable } from "inversify";
import type { IPartnerDataCollector } from "./i-partner-data-collector";
import type { PartnerData } from "./partner-data";

@injectable()
export class PartnerDataCollector implements IPartnerDataCollector {
  collectPartnerData(): Promise<PartnerData> {
    throw new Error("Method not implemented.");
  }
}
