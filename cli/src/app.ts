import { injectable, inject } from "inversify";
import * as CreateModule from "./create";
import type { IApp } from "./i-app";

@injectable()
export class App implements IApp {
  constructor(
    @inject(CreateModule.TYPES.IPartnerCreator)
    private partnerCreator: CreateModule.IPartnerCreator
  ) {}

  async main(): Promise<void> {
    await this.partnerCreator.createPartner();
  }
}
