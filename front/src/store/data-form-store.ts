import _, { map } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { getCountries } from '@api/countries-api';
import { getCurrencies } from '@api/currencies-api';
import { getOffsetAuditUnits, getOffsetStatus, getOffsetUnitTypes } from '@api/offset-api';
import { getProjectStandards } from '@api/project-standards-api';
import { getSustainableDevelopmentGoals } from '@api/sustainable-development-goals-api';
import { DataForm, ResponseFecthData } from '@custom-types/data-form-store';
import { RootStore } from './root-store';
import userStore from './user-store';

export const DataFormInitalValue = {
  countries: [],
  standards: [],
  auditUnits: [],
  devGoals: [],
  unitTypes: [],
  status: [],
  currencies: [],
};

export default class DataFormStore {
  rootStore: RootStore;

  formData: DataForm = DataFormInitalValue;

  private _loaded = false;

  isDataFetched = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'formData',
      properties: ['formData'],
      storage: window.localStorage,
    });
    if (!userStore.rolesInfo.admin) {
      this.fetchData();
    }
  }

  fetchDataFunction = async (elem: () => Promise<ResponseFecthData[]>) => {
    this._loaded = true;

    const fetchedData = await elem();

    this._loaded = false;

    return fetchedData.map((elemData: ResponseFecthData) => ({
      value: elemData.id,
      label: elemData.name || elemData.code,
      imageUrl: elemData.imageUri || '',
    }));
  };

  fetchData = async () => {
    this.isDataFetched = false;
    const [countries, standards, auditUnits, devGoals, unitTypes, status, currencies] =
      await Promise.all([
        this.fetchDataFunction(getCountries),
        this.fetchDataFunction(getProjectStandards),
        this.fetchDataFunction(getOffsetAuditUnits),
        this.fetchDataFunction(getSustainableDevelopmentGoals),
        this.fetchDataFunction(getOffsetUnitTypes),
        this.fetchDataFunction(getOffsetStatus),
        this.fetchDataFunction(getCurrencies),
      ]);

    runInAction(() => {
      this.formData = {
        countries,
        standards,
        auditUnits,
        devGoals,
        unitTypes,
        status,
        currencies,
      };
      this.isDataFetched = true;
    });
  };

  setStatus = (statuses: string[] | undefined) => {
    if (!statuses) return [];
    const statusPayload = statuses.map((status) => {
      if (!status) return '';
      const asignStatus = this.formData.status.find((elem) => elem.label === status);
      if (!asignStatus) return '';
      return asignStatus.value;
    });
    this.rootStore.filterStore.filter.statusIds = statusPayload;
  };

  set loaded(loaded: boolean) {
    this._loaded = loaded;
  }

  get loaded() {
    return this._loaded;
  }
}
