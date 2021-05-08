/**
 * A Be3 Sense Device
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

/**
 * @typedef Store
 * @param {Function} dispatch
 */

/**
 * Add a device to the store
 * @param {Store} store
 * @param {*} data
 */
export function addDevice(store, data) {
  store.dispatch('addDevice', data);
}

/**
 *
 * @param {*} store
 * @param {Device} device
 */
export function deleteDevice(store, device) {
  store.dispatch('deleteDevice', device.id);
}

