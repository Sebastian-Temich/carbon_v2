import { ROLES } from '@utils/index';

export interface IUser {
  roles: [{ id: string; name: ROLES }];
  email: string;
  id: string;
  customer: {
    company: {
      id: string;
    };
    id: string;
  };
}

export interface UserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface GetUsersResponse extends Array<UserResponse> {}

export interface UserResponse {
  roles: [{ id: string; name: ROLES }];
  phone: number | undefined;
  isActive: boolean;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

export interface GetModeratorsResponse extends Array<ModeratorResponse> {}
export interface ModeratorResponse {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  roles?: [
    {
      id: string;
      name: string;
    },
  ];
  customer?: boolean;
  moderator?: {
    id: string;
    phoneNumber: string;
  };
}
