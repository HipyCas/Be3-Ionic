<template>
	<ion-page>
		<ion-content class="ion-padding">
			<ion-title>Add device</ion-title>
			<ion-note style="margin-left: 1rem"
				>DEVICE ID INCREMENTS BY ONE AUTOMATICALLY</ion-note
			>
			<ion-grid>
				<ion-row>
					<ion-col style="margin-top: 1rem">
						<ion-item>
							<ion-label position="floating">Device name</ion-label>
							<ion-input></ion-input>
						</ion-item>
					</ion-col>
				</ion-row>
				<ion-title style="margin-top: 2rem; margin-bottom:0.5rem"
					>Location</ion-title
				>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">Name</ion-label>
							<ion-input></ion-input>
						</ion-item>
					</ion-col>
					<ion-col>
						<ion-item style="display:inline">
							<ion-label position="floating">North (Coordinates)</ion-label>
							<ion-input></ion-input>
						</ion-item>
						<!--ion-note style="display:inline">N</!--ion-note-->
					</ion-col>
					<ion-col>
						<ion-item>
							<ion-label position="floating">West (Coordinates)</ion-label>
							<ion-input></ion-input>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonTitle,
	IonNote,
	IonItem,
	IonLabel,
	IonInput,
} from '@ionic/vue';

export default {
	name: 'DevicesAdd',
	components: {
		IonPage,
		IonContent,
		IonGrid,
		IonRow,
		IonCol,
		IonTitle,
		IonNote,
		IonItem,
		IonLabel,
		IonInput,
	},
	setup() {},
};
</script>

<style></style>
