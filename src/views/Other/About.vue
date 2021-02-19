<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>About</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<FullPageText
				title="Work in progress"
				text="The About page is not finished yet, we hope for it to be finished soon!"
			></FullPageText>
		</ion-content>
	</ion-page>
</template>

<script>
import FullPageText from '@/components/FullPageText.vue';
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
	name: 'OtherAbout',
	components: {
		FullPageText,
		IonPage,
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonContent,
	},
};
</script>

<style></style>
