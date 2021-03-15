<template>
	<ion-list lines="none" :inset="false">
		<ion-item button router-link="/lab">Feature Lab</ion-item>
		<ion-item button href="https://hipycas.gitbook.io/be3" target="_blank"
			>Documentation</ion-item
		>
		<ion-item button router-link="/about">About</ion-item>
		<ion-item button @click="logoutUser">Logout</ion-item>
	</ion-list>
</template>

<script lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logout } from '../composables/auth';
import { LOGOUT_REDIRECT_HTTPS, BASE_URL } from '../../env';

export default defineComponent({
	name: 'HeaderOptions',
	components: { IonList, IonItem },
	methods: {
		logoutUser() {
			return logout(() => console.log('Great work, user logged out!'), {
				onError: (err) => console.error(err),
				dismissOnDone: true,
				dismissAfterCallback: true,
				redirectToLogin: true,
				redirectToHttps: LOGOUT_REDIRECT_HTTPS,
				baseURL: BASE_URL,
			});
		},
	},
});
</script>
