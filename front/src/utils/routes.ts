export const ROUTES = {
  All: {
    path: '*',
    name: '.',
    viewName: '.',
  },
  NotFound: {
    path: '/not-found',
    name: 'Brak strony',
    viewName: 'NOT_FOUND',
  },
  Dashboard: {
    path: '/dashboard',
    name: 'Dashboard',
    viewName: 'DASHBOARD',
  },
  Home: {
    path: '/',
    name: 'Home',
    viewName: 'HOME',
  },
  Login: {
    path: '/login',
    name: 'Login',
    viewName: 'LOGIN',
  },
  InvestorWallet: {
    path: 'investorwallet',
    name: 'InvestorWallet',
    viewName: 'INVESTORWALLET',
  },
  ModeratorProjects: {
    path: 'projects',
    name: 'Moderator Projects',
    viewName: 'MODERATOR_PROJECTS',
  },
  Transactions: {
    path: 'transactions',
    name: 'Transactions',
    viewName: 'MODERATOR_TRANSACTIONS',
  },
  AddOffset: {
    path: 'addoffset',
    name: 'AddOffset',
    viewName: 'ADDOFFSET',
  },
  OffsetsList: {
    path: 'offsetlist',
    name: 'OffsetsList',
    viewName: 'OFFSETSLIST',
  },
  Marketplace: {
    path: 'marketplace',
    name: 'Marketplace',
    viewName: 'MARKETPLACE',
  },
  Register: {
    path: '/register',
    name: 'Register',
    viewName: 'REGISTER',
  },
  Admin: {
    path: 'admin',
    name: 'Admin',
    viewName: 'ADMIN',
  },
  Moderator: {
    path: 'moderator',
    name: 'Moderator',
    viewName: 'MODERATOR',
  },
  Customer: {
    path: 'customer',
    name: 'Customer',
    viewName: 'CUSTOMER',
  },
  OffsetDetails: {
    path: 'marketplace/:id',
    name: 'OffsetDetails',
    viewName: 'OFFSETDETAILS',
  },
  ResetPass: {
    path: '/reset-pass',
    name: 'Reset password',
    viewName: 'RESET_PASSWORD',
  },
  ForgotPass: {
    path: '/forgot-pass',
    name: 'Forgot password',
    viewName: 'FORGOT_PASSWORD',
  },
  ProjectLogs: {
    path: 'projects/:projectId/logs',
    name: 'Project logs',
    viewName: 'PROJECT_LOGS',
  },
};
