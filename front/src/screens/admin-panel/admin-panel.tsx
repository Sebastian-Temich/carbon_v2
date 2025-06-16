import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { rootStore } from '@store/root-store';
import DataTable from '@components/data-table/data-table';
import { adminTableColumnCells } from './table/admin-table-column-cells';

export const AdminPanel = observer(() => {
  const { resetAllFilter } = rootStore.filterStore;
  const { setFilter } = rootStore.filterStore;
  const { fetchModerators } = rootStore.moderatorsStore;
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    resetAllFilter();
    setFilter('MODERATOR', 'default', 'role');
    fetchModerators();
  }, [refresh]);
  return (
    <div className="grid">
      <div className="col-12 car-component">
        <div className="card car-container">
          <DataTable tableColumnCells={adminTableColumnCells} setRefresh={setRefresh} />
        </div>
      </div>
    </div>
  );
});
