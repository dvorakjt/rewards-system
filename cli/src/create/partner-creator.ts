import { injectable, inject } from "inversify";
import { TYPES } from "./types";
import type { IPartnerCreator } from "./i-partner-creator";
import type { IPartnerDataCollector } from "./i-partner-data-collector";
import type { IPartnerResourcesCreator } from "./i-partner-resources-creator";

@injectable()
export class PartnerCreator implements IPartnerCreator {
  constructor(
    @inject(TYPES.IPartnerDataCollector)
    private partnerDataCollector: IPartnerDataCollector,
    @inject(TYPES.IPartnerResourcesCreator)
    private partnerResourcesCreator: IPartnerResourcesCreator
  ) {}

  async createPartner(): Promise<void> {
    const partnerData = await this.partnerDataCollector.collectPartnerData();
    console.log(partnerData);
    // await this.partnerResourcesCreator.createPartnerResources(partnerData);
  }
}
