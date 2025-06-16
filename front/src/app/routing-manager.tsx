import React, { Suspense } from 'react';

import loadable from '@loadable/component';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROLES, ROUTES } from '@utils/index';
import { ProtectedRoute } from './protected-route';

interface DashboardProps {
  menuType: string;
  children?: React.ReactNode;
}

interface BaseProps {
  children?: React.ReactNode;
}

const SignIn = loadable(() => import('@screens/login/login'), {
  resolveComponent: (components) => components.Login,
}) as unknown as React.ComponentType<{}>;

const Marketplace = loadable(() => import('@screens/marketplace/table/table-marketplace'), {
  resolveComponent: (components) => components.TableMarketplace,
}) as unknown as React.ComponentType<BaseProps>;

const InvestorWallet = loadable(() => import('@screens/investor-wallet/investor-wallet'), {
  resolveComponent: (components) => components.InvestorWallet,
}) as unknown as React.ComponentType<BaseProps>;

const AdminPanel = loadable(() => import('@screens/admin-panel/admin-panel'), {
  resolveComponent: (components) => components.AdminPanel,
}) as unknown as React.ComponentType<BaseProps>;

const Register = loadable(() => import('@screens/register/register'), {
  resolveComponent: (components) => components.Register,
}) as unknown as React.ComponentType<{}>;

const Dashboard = loadable(() => import('@screens/dashboard/dashboard'), {
  resolveComponent: (components) => components.Dashboard,
  fallback: <div>Loading...</div>,
}) as unknown as React.ForwardRefExoticComponent<DashboardProps>;

const AddOffset = loadable(() => import('@screens/offset/add-offset/add-offset'), {
  resolveComponent: (components) => components.AddOffset,
}) as unknown as React.ComponentType<BaseProps>;

const UserOffsetList = loadable(() => import('@screens/offset/table/table-offsets'), {
  resolveComponent: (components) => components.TableOffsets,
}) as unknown as React.ComponentType<BaseProps>;

const OffsetDetails = loadable(() => import('@screens/offset/offset-details/offset-details'), {
  resolveComponent: (components) => components.OffsetDetails,
}) as unknown as React.ComponentType<BaseProps>;

const ModeratorList = loadable(() => import('@screens/moderator/moderator'), {
  resolveComponent: (components) => components.ModeratorList,
}) as unknown as React.ComponentType<BaseProps>;

const ProjectLogs = loadable(() => import('@screens/project-logs/project-logs'), {
  resolveComponent: (components) => components.ProjectLogs,
}) as unknown as React.ComponentType<BaseProps>;

const Transactions = loadable(() => import('@screens/transactions/transactions'), {
  resolveComponent: (components) => components.Transactions,
}) as unknown as React.ComponentType<BaseProps>;

const ModeratorProjectList = loadable(() => import('@screens/projects/moderator-project-list'), {
  resolveComponent: (components) => components.ModeratorProjectList,
}) as unknown as React.ComponentType<BaseProps>;

const NotFound = loadable(() => import('@screens/not-found/not-found'), {
  resolveComponent: (components) => components.NotFound,
}) as unknown as React.ComponentType<{}>;

const RoutingManager = () => {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path={ROUTES.Login.path} element={<SignIn />} />
      <Route path={ROUTES.Register.path} element={<Register />} />
      <Route
        path={ROUTES.Admin.path}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <Suspense fallback={<div>{t('loading')}</div>}>
              <Dashboard menuType="admin">
                <AdminPanel />
              </Dashboard>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.Moderator.path}
        element={
          <ProtectedRoute roles={[ROLES.MODERATOR]}>
            <Suspense fallback={<div>{t('loading')}</div>}>
              <Dashboard menuType="moderator" />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<ModeratorList />} />
        <Route path={ROUTES.ProjectLogs.path} element={<ProjectLogs />} />
        <Route path={ROUTES.ModeratorProjects.path} element={<ModeratorProjectList />} />
        <Route path={ROUTES.Transactions.path} element={<Transactions />} />
      </Route>
      <Route
        path={ROUTES.Customer.path}
        element={
          <ProtectedRoute roles={[ROLES.CUSTOMER]}>
            <Suspense fallback={<div>{t('loading')}</div>}>
              <Dashboard menuType="customer" />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<Marketplace />} />
        <Route path={ROUTES.OffsetDetails.path} element={<OffsetDetails />} />
        <Route path={ROUTES.Marketplace.path} element={<Marketplace />} />
        <Route path={ROUTES.AddOffset.path} element={<AddOffset />} />
        <Route path={ROUTES.InvestorWallet.path} element={<InvestorWallet />} />
        <Route path={ROUTES.OffsetsList.path} element={<UserOffsetList />} />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<div>{t('loading')}</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default observer(RoutingManager);
