import { appContainer } from "./container";
import { TYPES } from "./types";
import type { IApp } from "./i-app";

const app = appContainer.get<IApp>(TYPES.IApp);
app.main();
