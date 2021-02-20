import { createRouter, createWebHistory } from '@ionic/vue-router';
import Overview from '../views/Overview.vue';
import DeviceTabs from '../views/Devices/Tabs.vue';
import DataTabs from '../views/Data/Tabs.vue';
import SettingsTabs from '../views/Settings/Tabs.vue';
import MessagesTabs from '../views/Messages/Tabs.vue';

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
			// Add device form: for for adding new device
			{
				path: 'add',
				component: () => import('../views/Devices/Add.vue'),
			},
			// Scan device qrCode: prompt for picture and redirect to form
			{
				path: 'scan',
				component: '<h1>Hi</h1>',
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

export default router;
