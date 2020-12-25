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
    }
});

export default store;
