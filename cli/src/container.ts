import { Container } from "inversify";
import { TYPES } from "./types";
import type { IApp } from "./i-app";
import { App } from "./app";
import * as CreateModule from "./create";

const appContainer = new Container();

appContainer.bind<IApp>(TYPES.IApp).to(App);

appContainer
  .bind<CreateModule.IPartnerCreator>(CreateModule.TYPES.IPartnerCreator)
  .to(CreateModule.PartnerCreator);

appContainer
  .bind<CreateModule.IPartnerDataCollector>(
    CreateModule.TYPES.IPartnerDataCollector
  )
  .to(CreateModule.PartnerDataCollector);

appContainer
  .bind<CreateModule.IPartnerResourcesCreator>(
    CreateModule.TYPES.IPartnerResourcesCreator
  )
  .to(CreateModule.PartnerResourcesCreator);

export { appContainer };
