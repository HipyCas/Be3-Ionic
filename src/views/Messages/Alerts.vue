<template>
	<ion-page>
		<ion-content class="ion-padding">
			<ion-list>
				<ion-list-header>
					<ion-title>Alerts from devices</ion-title>
				</ion-list-header>
				<AlertSlidingItem
					v-for="alert in alerts"
					:key="alert.id"
					:alert="alert"
				>
				</AlertSlidingItem>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonContent,
	IonList,
	IonListHeader,
	IonTitle,
} from '@ionic/vue';
import AlertSlidingItem from '../../components/AlertSlidingItem.vue';

export default {
	name: 'MessagesAlerts',
	components: {
		IonPage,
		IonContent,
		IonList,
		IonListHeader,
		IonTitle,
		AlertSlidingItem,
	},
	computed: {
		alerts() {
			return [
				{
					id: 0,
					title: 'An Alert',
					message:
						"This is the message and content of the alert that should be truncated in the list view as this text is surely longer than what the screen can fit in it, so you'll have to read this in the alert page",
					timestamp: '2021/01/01 14:57:23',
				},
				{
					id: 2,
					title: 'Another Alert',
					message:
						"This is the message and content of the alert that should be truncated in the list view as this text is surely longer than what the screen can fit in it, so you'll have to read this in the alert page",
					timestamp: '2021/01/01 14:57:23',
				},
				{
					id: 3,
					title: 'Wow other Alert',
					message:
						"This is the message and content of the alert that should be truncated in the list view as this text is surely longer than what the screen can fit in it, so you'll have to read this in the alert page",
					timestamp: '2021/01/01 14:57:23',
				},
				{
					id: 4,
					title: 'A Better Alert',
					message:
						"This is the message and content of the alert that should be truncated in the list view as this text is surely longer than what the screen can fit in it, so you'll have to read this in the alert page",
					timestamp: '2021/01/01 14:57:23',
				},
				{
					id: 5,
					title: 'The King Alert',
					message:
						"This is the message and content of the alert that should be truncated in the list view as this text is surely longer than what the screen can fit in it, so you'll have to read this in the alert page",
					timestamp: '2021/01/01 14:57:23',
				},
			];
		},
	},
};
</script>

<style></style>
