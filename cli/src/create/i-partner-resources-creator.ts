import type { PartnerData } from "./partner-data";

export interface IPartnerResourcesCreator {
  createPartnerResources(partnerData: PartnerData): void;
}
