import { makeAutoObservable, runInAction } from 'mobx';
import { GetModeratorsResponse, ModeratorResponse, UserProps } from '@custom-types/user-types';
import { PostModeratorProps } from '@custom-types/moderator-types';
import { deleteModerator, getModerators, patchModerator, postModerator } from '@api/moderator-api';
import { ApiResponse } from '@custom-types/api-types';
import { RootStore } from './root-store';

export default class ModeratorsStore {
  rootStore: RootStore;

  private _loaded = false;

  private _moderator: PostModeratorProps = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '' as unknown as number,
  };

  private _moderators: ApiResponse<GetModeratorsResponse> = new ApiResponse<GetModeratorsResponse>({
    data: [],
  });

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchModerators = async () => {
    this.loaded = false;
    const fetchedUsers = await getModerators({
      ...this.rootStore.filterStore.filter,
      ...this.rootStore.paginationStore.pagination,
    });
    runInAction(() => {
      this._moderators = fetchedUsers;
    });
    this.loaded = true;
  };

  setModerator = (defaultValue: boolean, rowData?: ModeratorResponse) => {
    if (defaultValue) {
      this._moderator = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '' as unknown as number,
      };
    }
    if (!defaultValue && rowData) {
      this._moderator = rowData;
    }
  };

  removeModerator = async (moderatorId: string) => {
    const response = await deleteModerator(moderatorId);
    if (response) {
      if (!this._moderators.data) return false;
      const deleted = this._moderators.data.filter((elem) => moderatorId !== elem.id);
      this._moderators.data = deleted;
      return true;
    }
    return false;
  };

  addModerator = async (payload: UserProps): Promise<ApiResponse<{ password: string }>> => {
    const response = await postModerator(payload);
    if (response.isSuccessful()) {
      await this.fetchModerators();
    }
    return response;
  };

  updateModerator = async (
    moderatorId: string,
    payload: UserProps,
  ): Promise<ApiResponse<ModeratorResponse>> => {
    const response = await patchModerator(moderatorId, payload);
    if (response.isSuccessful() && this._moderators.data) {
      const objectIndex = this._moderators.data.findIndex((object) => object.id === moderatorId);
      this._moderators.data[objectIndex] = { ...this._moderators.data[objectIndex], ...response };
    }
    return response;
  };

  set loaded(loaded: boolean) {
    this._loaded = loaded;
  }

  get loaded() {
    return this._loaded;
  }

  get moderator() {
    return this._moderator;
  }

  get moderators() {
    return this._moderators;
  }
}
