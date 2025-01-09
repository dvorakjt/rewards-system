import type { PartnerData } from "./partner-data";

export interface IPartnerDataCollector {
  collectPartnerData(): Promise<PartnerData>;
}
