<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Devices</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-tabs>
				<ion-tab-bar slot="bottom">
					<ion-tab-button tab="tab1" href="/devices/status">
						<ion-icon
							:md="informationCircleSharp"
							:ios="informationCircleOutline"
						/>
						<ion-label>Status</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab2" href="/devices/list">
						<ion-icon :md="listSharp" :ios="listOutline" />
						<ion-label>List</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab3" href="/devices/map">
						<ion-icon :md="mapSharp" :ios="mapOutline" />
						<ion-label>Map</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonContent,
	IonLabel,
	IonIcon,
	IonPage,
} from '@ionic/vue';
import {
	informationCircleSharp,
	informationCircleOutline,
	listSharp,
	listOutline,
	mapSharp,
	mapOutline,
} from 'ionicons/icons';

export default {
	name: 'Tabs',
	components: {
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonContent,
		IonLabel,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonIcon,
		IonPage,
	},
	setup() {
		return {
			informationCircleSharp,
			informationCircleOutline,
			listSharp,
			listOutline,
			mapSharp,
			mapOutline,
		};
	},
};
</script>
