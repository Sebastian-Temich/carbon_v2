import { GetFilterArgs } from '@custom-types/filter-types';
import { countFilterExceptions } from '@variables/filter-exceptions';
import dayjs from 'dayjs';
import _ from 'lodash';
import { makeAutoObservable, reaction, toJS } from 'mobx';

import { RootStore } from './root-store';

interface FilterType extends GetFilterArgs {
  [key: string]: string | string[] | boolean | number | undefined | null;
}

interface DataTransform {
  simpleData: string;
  data: string;
  count: string;
  default: string;
  checkbox: string;
}

interface Props {
  ownedByCompanyId?: string;
  statusIds?: string[];
  isOwnerOriginal?: boolean;
}

export default class FilterStore {
  rootStore: RootStore;

  filter: FilterType = {};

  date: FilterType = {};

  filterCount: number = 0;

  private _loaded = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    reaction(
      () => toJS(this.filter),
      () => this.countProperties(),
    );
  }

  setFilter = (
    value: string,
    transform: keyof DataTransform,
    property: keyof FilterType,
    secProperty?: keyof FilterType,
  ) => {
    const checkValue =
      value === null || value === '' || (value as unknown as number) === 0 ? undefined : value;
    this.rootStore.paginationStore.pagination.page = 1;
    switch (transform) {
      case 'simpleData':
        this.filter[property] = checkValue ? dayjs(value).format('YYYY-MM-DD') : undefined;
        this.date[property] = checkValue;
        break;
      case 'data':
        if (secProperty) {
          this.filter[property] = checkValue ? dayjs(value[0]).format() : undefined;
          this.filter[secProperty] = checkValue ? dayjs(value[1]).format() : undefined;
          this.date[property] = value;
        }
        break;
      case 'count':
        this.filter[property] = checkValue as unknown as number;
        break;
      case 'default':
        this.filter[property] = checkValue;
        break;
      case 'checkbox':
        this.filter[property] = checkValue;
        break;
      default:
        return null;
    }
    return this.filter;
  };

  setFetchPayload = (props: Props) => {
    this.filter.ownedByCompanyId = props.ownedByCompanyId;
    this.filter.isOwnerOriginal = props.isOwnerOriginal;
  };

  resetFilter = () => {
    this.filter.projectStandardId = undefined;
    this.filter.auditUnitId = undefined;
    this.filter.unitTypeId = undefined;
    this.filter.projectLocationCountryId = undefined;
    this.filter.projectSustainableDevelopmentGoalIds = undefined;
    this.filter.currencyIds = undefined;
    this.filter.unitCreationYear = undefined;
    this.filter.projectStartDate = undefined;
    this.filter.projectExpectedEndDate = undefined;
    this.filter.projectUnitGenerationStartDate = undefined;
    this.filter.projectUnitGenerationEndDate = undefined;
    this.filter.projectCircularity = undefined;
    this.filter.unitCountMin = undefined;
    this.filter.unitCountMax = undefined;
    this.filter.unitPriceMax = undefined;
    this.filter.unitPriceMin = undefined;
    this.filter.name = undefined;
    this.filter.countryIds = undefined;
    this.filter.sdgIds = undefined;
    this.filter.projectStandardIds = undefined;
    this.filter.totalUnitCountFrom = undefined;
    this.filter.totalUnitCountTo = undefined;
    this.filter.creationDateFrom = undefined;
    this.filter.creationDateTo = undefined;
  };

  countProperties() {
    this.filterCount = 0;
    const keys = Object.keys(this.filter).filter(
      (key) => this.filter[key] !== undefined && !countFilterExceptions.includes(key),
    );
    this.filterCount = keys.length;
  }

  resetAllFilter = () => {
    this.filter = { page: 1, perPage: 8 };
  };

  set loaded(loaded: boolean) {
    this._loaded = loaded;
  }

  get loaded() {
    return this._loaded;
  }
}
