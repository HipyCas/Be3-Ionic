import { createStore } from 'vuex';

const store = createStore({
    state () {
        return {
            devices: [
                {
                    'id': 1,
                    'name': 'First',
                    'location': '8º5"45\'N 5º56"7\'O',
                    'status': 0,
                },
                {
                    'id': 2,
                    'name': 'Second',
                    'location': '8º5"45\'N 5º56"7\'O',
                    'status': 1,
                },
                {
                    'id': 3,
                    'name': 'Third',
                    'location': '8º5"45\'N 5º56"7\'O',
                    'status': 1,
                },
                {
                    'id': 4,
                    'name': 'Fourth',
                    'location': '8º5"45\'N 5º56"7\'O',
                    'status': 2,
                },
            ],
            records: [
                {
                    id: 1,
                    'inside_temp': 28.5,
                    'inside_hum': 89.7,
                    'outside_temp': 19.8,
                    'outside_hum': 78.9,
                },
                {
                    id: 2,
                    'inside_temp': 23.5,
                    'inside_hum': 92.7,
                    'outside_temp': 9.8,
                    'outside_hum': 87.9,
                },
                {
                    id: 3,
                    'inside_temp': 38.5,
                    'inside_hum': 76.7,
                    'outside_temp': 29.8,
                    'outside_hum': 72.9,
                },
                {
                    id: 4,
                    'inside_temp': 29.9,
                    'inside_hum': 88.7,
                    'outside_temp': 18.4,
                    'outside_hum': 76.4,
                },
            ]
        };
    },
    getters: {
        devices(state) {
            return state.devices;
        },
        device(store) {
            return (id) => {
                return store.devices.find(device => device.id === id);
            };
        },
        filterDevices(store) {
            return (filter, condition) => store.devices.filter(device => device[filter] == condition);
        },
        onlineDevices(store) {
            return store.devices.filter(device => device.status == 0);
        },
        warningDevices(store) {
            return store.devices.filter(device => device.status == 1);
        },
        offlineDevices(store) {
            return store.devices.filter(device => device['status'] == 2);
        },
        records(store) {
            return store.records;
        },
        record(store) {
            return (id) => {
                return store.records.find(record => record.id == id)
            }
        }
    }
});

export default store;
