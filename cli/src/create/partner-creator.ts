import { injectable, inject } from "inversify";
import { TYPES } from "./types";
import * as LoadingModule from "../loading";
import type { IPartnerCreator } from "./i-partner-creator";
import type { IPartnerDataCollector } from "./i-partner-data-collector";
import type { IPartnerResourcesCreator } from "./i-partner-resources-creator";

@injectable()
export class PartnerCreator implements IPartnerCreator {
  constructor(
    @inject(TYPES.IPartnerDataCollector)
    private partnerDataCollector: IPartnerDataCollector,
    @inject(TYPES.IPartnerResourcesCreator)
    private partnerResourcesCreator: IPartnerResourcesCreator,
    @inject(LoadingModule.TYPES.ILoadingIndicator)
    private loadingIndicator: LoadingModule.ILoadingIndicator
  ) {}

  async createPartner(): Promise<void> {
    const partnerData = await this.partnerDataCollector.collectPartnerData();
    this.loadingIndicator.startLoading("Creating partner resources...");
    this.partnerResourcesCreator.createPartnerResources(partnerData);
    this.loadingIndicator.stopLoading();
    console.log("Created partner! Next, you should edit the lambda function.");
  }
}
