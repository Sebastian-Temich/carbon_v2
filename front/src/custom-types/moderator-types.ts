import { ModeratorResponse } from './user-types';

export interface PostModeratorProps extends ModeratorResponse {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number | undefined;
}
