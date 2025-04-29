import appConfig from "../../config.json";

type Config = {
  app: App;
  api: Api;
};

type App = {
  name: string;
  version: string;
  environment: string;
};

type Api = {
  url: string;
  timeout: number;
};

export const config: Config = {
  ...appConfig,
};
