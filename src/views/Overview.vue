<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Overview</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content> </ion-content>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonHeader,
	IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
	IonContent,
} from '@ionic/vue';

export default {
	name: 'Overview',
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonButtons,
        IonMenuButton,
        IonTitle,
		IonContent,
	},
	setup() {
		console.log('Setted up!');

		return {};
	},
};
</script>
