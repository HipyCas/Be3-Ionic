import { loadingController } from '@ionic/vue';

/**
 *
 * @param {string} email Email for login
 * @param {string} password Password for email
 * @returns Promise<>
 */
export async function login(email, password) {
	return new Promise((resolve, reject) => {
		if (email === 'admin@be3.com' && password === 'SuperSecurePassword')
			resolve();
		else reject('Incorrect email or password');
	});
}

/**
 *
 * @param {*} app The Vue instance (this)
 * @param {Function} callback A callback function to execute when finished logout
 * @param {Object} [options] Options object
 * @param {number} [options.duration=3000] Number of milliseconds before automatic dismissal of loading overlay (duration option of overlay)
 * @param {Function} [options.onError] A function to run when an error is risen
 * @param {boolean} [options.dismissOnError=true] Whether to dismiss the loading overlay when an error is risen
 * @param {boolean} [options.dismissAfterOnError=false] Wether to dismiss the loading overlay before or after the onError function (when error thrown)
 * @param {boolean} [options.dismissOnDone=true] Whether to dismiss the loading overlay when successfully logged out
 * @param {boolean} [options.dismissAfterCallback=false] Wether to dismiss the loading overlay before or after callback
 * @param {boolean} [options.redirectToLogin=false] Whether to redirect to the login page after logout
 * @param {string} [options.loginRoute='/auth/login'] Route to redirect to when redirecting to login
 * @param {string} [options.baseURL='localhost:8100'] The base URL were the page is running (required for proper redirect)
 * @param {boolean} [options.redirectToHttps=false] Whether to redirect to https or http
 * @returns () => Promise<void>
 */
export async function logout(
	callback,
	options = {
		dismissOnDone: true,
		dismissAfterCallback: false,
		dismissOnError: true,
		dismissAfterOnError: false,
	}
) {
	const loading = await loadingController.create({
		message: 'Logging out...',
		duration: options.duration ?? 3000,
	});
	logoutLogic()
		.then(() => {
			if (options.dismissOnDone && !options.dismissAfterCallback)
				loading.dismiss();
			callback();
			if (options.dismissOnDone && options.dismissAfterCallback)
				loading.dismiss();
			if (options.redirectToLogin)
				// window.location.href = 'http' + (options.redirectToHttps ? 's' : '') + '://' + (options.baseURL ?? 'localhost:8100') + (options.loginRoute ?? '/auth/login');
        window.location.href = options.loginRoute ?? '/auth/login';
		})
		.catch((err) => {
			if (options.onError) {
				if (options.dismissOnError && !options.dismissAfterOnError)
					loading.dismiss();
				options.onError(err);
				if (options.dismissOnError && options.dismissAfterOnError)
					loading.dismiss();
			} else throw err;
		});
	return loading.present();
}

export async function logoutLogic() {
	return new Promise((resolve, reject) => {
		console.log('Doing something');
		const t = true;
		if (t) resolve();
		else reject();
	});
}
