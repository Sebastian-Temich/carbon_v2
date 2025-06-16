import DataFormStore from './data-form-store';
import FilterStore from './filter-store';
import MarketplaceStore from './marketplace-store';
import ModeratorsStore from './moderators-store';
import PaginationStore from './pagination';
import ProjectStore from './project-store';
import { TransactionsStore } from './transactions-store';

export class RootStore {
  filterStore: FilterStore;

  marketplaceStore: MarketplaceStore;

  dataFormStore: DataFormStore;

  paginationStore: PaginationStore;

  moderatorsStore: ModeratorsStore;

  projectStore: ProjectStore;

  transactionsStore: TransactionsStore;

  constructor() {
    this.projectStore = new ProjectStore(this);
    this.filterStore = new FilterStore(this);
    this.paginationStore = new PaginationStore(this);
    this.marketplaceStore = new MarketplaceStore(this);
    this.dataFormStore = new DataFormStore(this);
    this.moderatorsStore = new ModeratorsStore(this);
    this.transactionsStore = new TransactionsStore(this);
  }
}

export const rootStore = new RootStore();
