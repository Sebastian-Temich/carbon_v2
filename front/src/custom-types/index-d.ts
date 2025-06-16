import { CarbonConfigWindow } from './config-types';

export {};

declare global {
  interface Window {
    Carbon: CarbonConfigWindow;
  }
}
