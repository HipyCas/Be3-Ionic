/**
 * A Be3 sensor device
 * @typedef {Object} device
 * @property {int} id The device id
*/

/**
 * 
 * @param {*} store 
 * @param {device} device 
 */
export function deleteDevice(store, device) {
  store.dispatch('deleteDevice', device.id);
}
