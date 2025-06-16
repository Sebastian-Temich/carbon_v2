enum NodeEnvs {
  Local = 'local',
  Development = 'development',
  Production = 'production',
}

export interface CarbonConfigWindow {
  ApiUrl: URL;
  NodeEnv: NodeEnvs;
}
