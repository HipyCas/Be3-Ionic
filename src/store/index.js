/* eslint-disable no-prototype-builtins */
import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			devices: [
				{
					id: 1,
					name: 'First',
					location: '8º5"45\'N 5º56"7\'O',
					status: 0,
				},
				{
					id: 2,
					name: 'Second',
					location: '8º5"45\'N 5º56"7\'O',
					status: 1,
				},
				{
					id: 3,
					name: 'Third',
					location: '8º5"45\'N 5º56"7\'O',
					status: 1,
				},
				{
					id: 4,
					name: 'Fourth',
					location: '8º5"45\'N 5º56"7\'O',
					status: 2,
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
		updateFeature(state, options) {
			state.features[options.name] = options.value;
		},
	},
	actions: {
		loadData() {
			axios
				.get('localhost:9000/devices/')
				.then((response) => this.mutations.updateDevices(response.data))
				.catch((err) =>
					console.error(`Caught error when requesting all devices: ${err}`)
				);
			axios
				.get('localhost:9000/records/')
				.then((response) => this.updateRecords(response.data))
				.catch((err) =>
					console.error(`Caught error when requesting all devices: ${err}`)
				);
		},
		/**
		 *
		 * @param {*} context
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
					resolve();
				} catch (e) {
					reject(e);
				}
			});
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
			return (id) => {
				return store.devices.find((device) => device.id === id);
			};
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
	},
});

export default store;
