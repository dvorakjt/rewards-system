import { Container } from "inversify";
import * as CreateModule from "./create";
import * as LoadingModule from "./loading";

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

appContainer
  .bind<LoadingModule.ILoadingIndicator>(LoadingModule.TYPES.ILoadingIndicator)
  .to(LoadingModule.LoadingIndicator);

export { appContainer };
