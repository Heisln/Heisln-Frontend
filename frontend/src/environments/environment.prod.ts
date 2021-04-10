import { CustomEnv } from './environment_type';
export const environment: CustomEnv = {
  production: true,
  version: '%VERSION%',
  loginUrl: '/login',
  apiBasePath: 'heisln-api', // TODO: add url for live version
};
