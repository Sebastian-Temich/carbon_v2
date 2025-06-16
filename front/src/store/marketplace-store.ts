import { makeAutoObservable, reaction, runInAction } from 'mobx';

import { getOffsets } from '@api/offsets-api';
import { ApiResponse } from '@custom-types/api-types';
import { ResponseOffset } from '@custom-types/offsets-types';
import { RootStore } from './root-store';

export default class MarketplaceStore {
  rootStore: RootStore;

  private _loaded = true;

  private _marketplace: ApiResponse<ResponseOffset[]> = new ApiResponse<ResponseOffset[]>({
    data: [],
  });

  sellOffset: any = {};

  retireOffset: any = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchMarketplace = async () => {
    this.loaded = false;
    this._marketplace = new ApiResponse<ResponseOffset[]>({ data: [] });
    const fetchedMarketplace = await getOffsets({
      ...this.rootStore.filterStore.filter,
      ...this.rootStore.paginationStore.pagination,
    });
    runInAction(() => {
      this._marketplace = fetchedMarketplace;
    });
    this.loaded = true;
  };

  sellOffsetsList = (offset: ResponseOffset) => {
    this.sellOffset = offset;
  };

  retireOffsetsList = (offset: ResponseOffset) => {
    this.retireOffset = offset;
  };

  set loaded(loaded: boolean) {
    this._loaded = loaded;
  }

  get loaded() {
    return this._loaded;
  }

  get marketplace() {
    return this._marketplace;
  }
}
