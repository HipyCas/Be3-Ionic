/* eslint-disable no-prototype-builtins */
import axios from 'axios';
import { createStore } from 'vuex';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

// TODO Change devices location to object parameter

/**
 * @typedef Device
 * @param {number} id The device id, auto-incremental
 * @param {string} name
 * @param {string} location
 * @param {number} status 0 - Online, 1 - Warning, 2 - Error/OffLine
 * @param {object} permissions
 * @param {object} permissions.url
 * @param {boolean} permissions.url.enabled
 * @param {string} permissions.url.code
 * @param {object[]} permissions.people
 * @param {number} permissions.ownerId
 */

const defaultFeatures = {
	forceDarkTheme: false,
	customAccentColor: false,
	customAccentColorValue: 'blue',
	matrixOrgClient: true,
	customViews: false,
	customViewsValue: 0,
};

const emptyDevice = {
	id: -1,
	name: 'Unknown Device',
	status: 0,
	location: 'Undefined',
	permissions: {
		url: {
			enabled: false,
			code: 'safhie5'
		},
		people: [
		],
		ownerId: -1
	}
}

const defaultDevicePermissions = {
	url: {
		enabled: false,
		code: 'safhie5'
	},
	people: [],
	ownerId: -1
}

const defaultDevicePermissionsUrl = {
	enabled: false,
	code: 'safhie5'
}

const store = createStore({
	state() {
		return {
			devices: [
				{
					id: 1,
					name: 'First',
					location: '8º5"45\'N 5º56"7\'O',
					status: 0,
					permissions: {
						url: {
							enabled: true,
							code: 'ultjfj6bs64',
						},
						people: [
							{
								userId: 2,
								role: 'view',
							},
							{
								userId: 3,
								role: 'edit',
							},
						],
						ownerId: 1,
					},
				},
				{
					id: 2,
					name: 'Second',
					location: '8º5"45\'N 5º56"7\'O',
					status: 1,
					permissions: {
						url: {
							enabled: true,
							code: 'ultjfj6bs64',
						},
						people: [
							{
								userId: 2,
								role: 'view',
							},
							{
								userId: 3,
								role: 'edit',
							},
						],
						ownerId: 1,
					},
				},
				{
					id: 3,
					name: 'Third',
					location: '8º5"45\'N 5º56"7\'O',
					status: 1,
					permissions: {
						url: {
							enabled: true,
							code: 'ultjfj6bs64',
						},
						people: [
							{
								userId: 2,
								role: 'view',
							},
							{
								userId: 3,
								role: 'edit',
							},
						],
						ownerId: 1,
					},
				},
				{
					id: 4,
					name: 'Fourth',
					location: '8º5"45\'N 5º56"7\'O',
					status: 2,
					permissions: {
						url: {
							enabled: true,
							code: 'ultjfj6bs64',
						},
						people: [
							{
								userId: 2,
								role: 'view',
							},
							{
								userId: 3,
								role: 'edit',
							},
						],
						ownerId: 1,
					},
				},
			],
			records: [
				{
					id: 1,
					inside_temp: 28.5,
					inside_hum: 89.7,
					outside_temp: 19.8,
					outside_hum: 78.9,
				},
				{
					id: 2,
					inside_temp: 23.5,
					inside_hum: 92.7,
					outside_temp: 9.8,
					outside_hum: 87.9,
				},
				{
					id: 3,
					inside_temp: 38.5,
					inside_hum: 76.7,
					outside_temp: 29.8,
					outside_hum: 72.9,
				},
				{
					id: 4,
					inside_temp: 29.9,
					inside_hum: 88.7,
					outside_temp: 18.4,
					outside_hum: 76.4,
				},
				{
					id: 5,
					inside_temp: 29.9,
					inside_hum: 88.7,
					outside_temp: 18.4,
					outside_hum: 76.4,
				},
			],
			features: {
				forceDarkTheme: false,
				customAccentColor: false,
				customAccentColorValue: 'blue',
				matrixOrgClient: true,
				customViews: false,
				customViewsValue: 0,
			},
		};
	},
	mutations: {
		//* DB related
		updateDevices(state, data) {
			state.devices = JSON.parse(data);
		},
		updateRecords(state, data) {
			state.records = JSON.parse(data);
		},
		//* Features
		// Load saved features from localStorage
		loadFeatures(state) {
			Storage.get({ key: 'features' })
				.then(({ value }) => {
					value = value || defaultFeatures;
					state.features = JSON.parse(value);
					console.info(
						`Successfully updated features from localStorage to ${value}`
					);
				})
				.catch((e) =>
					console.error(`Couldn't retrieve features from localStorage: ${e}`)
				);
		},
		// Update all features to a matching object
		updateFeatures(state, features) {
			state.features = features;
		},
		// Update an specific feature
		updateFeature(state, options) {
			state.features[options.name] = options.value;
		},
    //* Devices
		/**
		 * Add a device to the store
		 * @param {*} state
		 * @param {Device} data The device to be added
		 */
		addDevice(state, data) {
			data['id'] = state.devices[state.devices.length - 1].id + 1 // Set id to be next available (one more than last)
			// Ensure that all properties are defined to their defaults
			if (data.permissions == undefined)  data.permissions = defaultDevicePermissions
			else {
				data['permissions']['url'] = {
					...defaultDevicePermissionsUrl,
					...data?.permissions?.url
				}
				data['permissions'] = {
					...defaultDevicePermissions,
					...data?.permissions
				}
			}
			// Push to array
			state.devices.push({
				...emptyDevice,
				...data
			})
		},
    /**
     * Delete a device from the store based on its id
     * @param {*} state 
     * @param {int} id The id of the device to delete
     */
		deleteDevice(state, id) {
			state.devices = state.devices.filter(( device ) => device.id !== id);
		},
		updateDevice(state, id, data) {
			state.devices.forEach((i, device) => {
				if (device.id === id) state.devices[i] = data
			})
		}
	},
	actions: {
    /**
     * @callback commitFunction 
     * @param {string} mutation The mutation to run
     * @param {...*} args Arguments passed to mutation
     */
		loadData(context) {
			console.log(`Started load of devices from DB (async)`);
			axios
				.get('localhost:9000/devices/')
				.then((response) => context.commit('updateDevices', response.data))
				.catch((err) =>
					console.error(`Caught error when requesting all devices: ${err}`)
				);
			console.log(`Started load of records from DB (async)`);
			axios
				.get('localhost:9000/records/')
				.then((response) => context.commit('updateRecords', response.data))
				.catch((err) =>
					console.error(`Caught error when requesting all devices: ${err}`)
				);
			console.log(`Started load of features from localStorage`);

			context.commit('loadFeatures');
		},
		/**
		 *
		 * @param {Object} context
		 * @param {Object} context.state
		 * @param {Object} context.state.features
		 * @param {Boolean} context.state.features.forceDarkTheme
		 * @param {Function} context.commit
		 * @param {Object} features - The new features to be written to the store
		 * @param {Boolean} features.forceDarkTheme - Wether or not to force the dark theme
		 */
		setFeatures(context, features) {
			return new Promise((resolve, reject) => {
				if (
					Object.keys(features).length !==
					Object.keys(context.state.features).length
				)
					reject(
						'Store expects same features, but found different ones (more or less than expected)'
					);
				try {
					context.commit('updateFeatures', features);
					console.info('Updated features in Vuex store');
				} catch (e) {
					reject(e);
				}
				try {
					context.dispatch('updateLocalStorageFeatures');
					console.info('Updated features in local storage');
					resolve();
				} catch (e) {
					reject(e);
				}
			});
		},
		/**
		 * Set an specific feature to a value passed
		 *
		 * param {*} context
		 * @param {Object} options - An object with the name of the feature and the desired value
		 * @param {String} options.name - The name of the feature to update
		 * @param {*} options.value - The value the feature will be set to
		 */
		setFeature(context, options) {
			return new Promise((resolve, reject) => {
				if (!options.hasOwnProperty('name')) reject('No name found');
				if (!options.hasOwnProperty('value')) reject('No value found');
				try {
					context.commit('updateFeature', options);
					console.info('Updated features in Vuex store');
				} catch (e) {
					reject(e);
				}
				try {
					context.dispatch('updateLocalStorageFeatures');
					console.info('Updated features in local storage');
					resolve();
				} catch (e) {
					reject(e);
				}
			});
		},
		updateLocalStorageFeatures({ state }) {
			Storage.set({
				key: 'features',
				value: JSON.stringify(state.features),
			})
				.then(() =>
					console.info(
						`Successfully updated features in localStorage to ${JSON.stringify(
							state.features
						)}`
					)
				)
				.catch((e) =>
					console.error(`Error when updating features in localStorage: ${e}`)
				);
		},
    //* Devices
		addDevice({ commit }, data) {
			commit('addDevice', data)
		},
    /**
     * Delete a device from the 
     * @param {object} context
     * @param {commitFunction} context.commit Function that executes a mutation
     * @param {int} id The id of the device to delete
     */
		deleteDevice({ commit }, id) {
			commit('deleteDevice', id);
		},
	},
	getters: {
		//* Devices
		// All devices
		devices(state) {
			return state.devices;
		},
		// Device by id
		device(store) {
			return (id) => store.devices.find((device) => device.id === id);
		},
		// Filtered list of devices
		filterDevices(store) {
			return (filter, condition) =>
				store.devices.filter((device) => device[filter] == condition);
		},
		// Only online devices
		onlineDevices(store) {
			return store.devices.filter((device) => device.status == 0);
		},
		// Only warning devices
		warningDevices(store) {
			return store.devices.filter((device) => device.status == 1);
		},
		// Only offline/error devices
		offlineDevices(state) {
			return state.devices.filter((device) => device['status'] == 2);
		},
		//* Records
		// All records
		records(state) {
			return state.records;
		},
		// Specific record by id
		record(state) {
			return (id) => {
				return state.records.find((record) => record.id == id);
			};
		},
		//* Features
		features(state) {
			return state.features;
		},
		feature(state) {
			return (name) => state.features[name];
		},
	},
});

export default store;

