import { ResponseProjectProps } from '@custom-types/projects-types';
import { makeAutoObservable, runInAction } from 'mobx';
import { getProjects } from '@api/project-api';
import { ApiResponse } from '@custom-types/api-types';
import { RootStore } from './root-store';

export default class ProjectStore {
  rootStore: RootStore;

  private _loaded = false;

  private _projects: ApiResponse<ResponseProjectProps[]> = new ApiResponse({ data: [] });

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchProjects = async () => {
    runInAction(() => {
      this._loaded = false;
    });
    this._projects = new ApiResponse({ data: [] });
    const projects = await getProjects({
      ...this.rootStore.filterStore.filter,
      ...this.rootStore.paginationStore.pagination,
    });
    runInAction(() => {
      this._projects = projects;
      this._loaded = true;
    });
  };

  set loaded(loaded: boolean) {
    this._loaded = loaded;
  }

  get loaded() {
    return this._loaded;
  }

  get projects() {
    return this._projects;
  }
}
