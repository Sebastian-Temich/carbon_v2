import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { getUser } from '@api/user-api';
import { IUser } from '@custom-types/user-types';
import { ROLES } from '@utils/roles';

class UserStore {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'currentUser',
      properties: ['user'],
      storage: window.localStorage,
    });
  }

  user: IUser | undefined = undefined;

  async getUserData() {
    const user = await getUser();

    if (!user) return;

    this.setUser(user);
  }

  setUser = (user: IUser | undefined) => {
    this.user = user;
  };

  hasUserRole(roleName: string) {
    return !!this.user?.roles?.find((role) => role.name === roleName);
  }

  get rolesInfo() {
    const customer = this.hasUserRole(ROLES.CUSTOMER);
    const moderator = this.hasUserRole(ROLES.MODERATOR);
    const admin = this.hasUserRole(ROLES.ADMIN);

    return {
      customer,
      moderator,
      admin,
    };
  }
}

const userStore = new UserStore();
export default userStore;
