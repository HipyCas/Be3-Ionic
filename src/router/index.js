import { createRouter, createWebHistory } from '@ionic/vue-router';
import Overview from '../views/Overview.vue';
import DeviceTabs from '../views/Devices/Tabs.vue';
import DataTabs from '../views/Data/Tabs.vue';
import SettingsTabs from '../views/Settings/Tabs.vue';
import MessagesTabs from '../views/Messages/Tabs.vue';

import { supabase } from '../composables/supabase';
import store from '../store';

const routes = [
  //* Start redirect
  {
    path: '/',
    redirect: '/overview/',
  },
  //* Overview
  {
    path: '/overview/',
    component: Overview,
  },
  //* Auth
  // Login
  {
    path: '/auth/login',
    component: () => import('../views/Auth/Login.vue'),
  },
  //* Devices
  {
    path: '/devices/',
    component: DeviceTabs,
    children: [
      // Redirect start to status
      {
        path: '',
        redirect: '/devices/status',
      },
      // Status: overview of the status of all devices
      {
        path: 'status',
        component: () => import('../views/Devices/Status.vue'),
      },
      // List: list of all devices
      {
        path: 'list',
        component: () => import('../views/Devices/List.vue'),
      },
      // TODO Map: show a map where each is located
      {
        path: 'map',
        component: () => import('../views/Devices/Map.vue'),
      },
      // Single device: device page accessed by device id
      {
        path: 'device/:id',
        component: () => import('../views/Devices/Device.vue'),
      },
      // Shared device: device page for devices accessed over public link (no login required)
      {
        path: 'shared/:code',
      },
      // Add device form: for for adding new device
      {
        path: 'add',
        component: () => import('../views/Devices/Add.vue'),
      },
      // Scan device qrCode: prompt for picture and redirect to form
      {
        path: 'scan',
        component: () => import('../views/Devices/QRScan.vue'),
      },
    ],
  },
  // * Data visualization
  {
    path: '/data/',
    component: DataTabs,
    children: [
      {
        path: '',
        redirect: '/data/charts',
      },
      {
        path: 'charts',
        component: () => import('../views/Data/Charts.vue'),
      },
      {
        path: 'timeline',
        component: () => import('../views/Data/Timeline.vue'),
      },
      {
        path: 'export',
        component: () => import('../views/Data/Export.vue'),
      },
    ],
  },
  //* Settings
  {
    path: '/settings/',
    component: SettingsTabs,
    children: [
      {
        path: '',
        redirect: '/settings/general',
      },
      {
        path: 'general',
        component: () => import('../views/Settings/General.vue'),
      },
      {
        path: 'account',
        component: () => import('../views/Settings/Account.vue'),
      },
      {
        path: 'devicesanddata',
        component: () => import('../views/Settings/DevicesAndData.vue'),
      },
    ],
  },
  //* Messages
  {
    path: '/messages/',
    component: MessagesTabs,
    children: [
      {
        path: '',
        redirect: '/messages/alerts',
      },
      {
        path: 'alerts',
        component: () => import('../views/Messages/Alerts.vue'),
      },
      {
        path: 'alert/:id',
        component: () => import('../views/Messages/Alert.vue'),
      },
      {
        path: 'broadcast',
        component: () => import('../views/Messages/Broadcast.vue'),
      },
      {
        path: 'developer',
        component: () => import('../views/Messages/Developer.vue'),
      },
      {
        path: 'matrix',
        component: () => import('../views/Messages/Matrix.vue'),
      },
    ],
  },
  //* Other
  // Feature Lab
  {
    path: '/lab/',
    component: () => import('../views/Other/FeatureLab.vue'),
  },
  // About
  {
    path: '/about/',
    component: () => import('../views/Other/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function authGuard(to, from, next) {
  console.log('Supabase as a whole: ', supabase);
  console.log('My lovely user: ', supabase.auth.user());
  if (to.path === '/auth/login') next();
  else {
    if (
      (supabase.auth.user() === null || supabase.auth.user() === undefined) &&
      (store.getters.user === null || store.getters.user === undefined)
    ) {
      console.warn(
        'ho ho I caught you trying to sneak around, please be kind and login'
      );
      next('/auth/login');
    } else next();
  }
}

authGuard;

//! router.beforeEach(authGuard); NOT WORKING, RETURNING THAT USER IS NULL

export default router;
