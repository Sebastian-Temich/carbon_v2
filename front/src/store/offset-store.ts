import { makeAutoObservable, runInAction } from 'mobx';

import { getOffset, UpdateOffsetList } from '@api/offsets-api';
import { PatchResponseOffset, ResponseOffset } from '@custom-types/offsets-types';
import { PatchProjectPayload, ResponseProjectProps } from '@custom-types/projects-types';
import { patchProject } from '@api/project-api';
import { ApiResponse } from '@custom-types/api-types';

class OffsetDetailsStore {
  private _loaded = false;

  private _offsetDetails: ResponseOffset | null = null;

  private _projectDetails: ResponseProjectProps | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  fetchOffset = async (offsetId: string) => {
    this.loaded = false;
    const fetchedOffsetDetails = await getOffset(offsetId);
    if (fetchedOffsetDetails) {
      runInAction(() => {
        this._offsetDetails = fetchedOffsetDetails;
      });
    }
    this.loaded = true;
  };

  updateOffset = async (
    payload: PatchResponseOffset,
    id: string | undefined,
  ): Promise<ApiResponse<ResponseOffset>> => {
    const response = await UpdateOffsetList(payload, id);

    if (response.isSuccessful()) {
      runInAction(() => {
        this._offsetDetails = response.data!;
      });
    }
    return response;
  };

  updateProject = async (
    payload: PatchProjectPayload,
    projectId: string | undefined,
  ): Promise<ApiResponse<ResponseProjectProps>> => {
    const response = await patchProject(payload, projectId);
    if (response.isSuccessful()) {
      runInAction(() => {
        this._projectDetails = response.data!;
      });
    }
    return response;
  };

  set loaded(loaded: boolean) {
    this._loaded = loaded;
  }

  get loaded() {
    return this._loaded;
  }

  get offsetDetails() {
    return this._offsetDetails;
  }

  get projectDetails() {
    return this._projectDetails;
  }
}

export const offsetDetailsStore = new OffsetDetailsStore();
