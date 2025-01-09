import { injectable } from "inversify";
import type { IPartnerResourcesCreator } from "./i-partner-resources-creator";
import type { PartnerData } from "./partner-data";

@injectable()
export class PartnerResourcesCreator implements IPartnerResourcesCreator {
  createPartnerResources(partnerData: PartnerData): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
