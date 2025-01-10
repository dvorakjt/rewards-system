import { Container } from "inversify";
import * as CreateModule from "./create";

const appContainer = new Container();

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
